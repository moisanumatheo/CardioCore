import nodemailer from "nodemailer";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import AppointmentEmail from "./_lib/AppointmentEmail.jsx";

/**
 * CONFIG
 * Recomandat: setează ALLOWED_ORIGINS în Vercel ENV:
 * ALLOWED_ORIGINS="https://cardiocore.ro,https://www.cardiocore.ro"
 */
const DEFAULT_ALLOWED_ORIGINS = [
  "https://cardiocore.ro",
  "https://www.cardiocore.ro",
];

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ---------- helpers: security ----------
function parseAddrList(s) {
  return String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);
}

function safePort(val, fallback) {
  const n = parseInt(String(val ?? "").trim(), 10);
  return Number.isFinite(n) && n > 0 && n < 65536 ? n : fallback;
}

function hasCRLF(s) {
  return typeof s === "string" && /[\r\n]/.test(s);
}

function clampString(val, maxLen) {
  if (typeof val !== "string") return "";
  const v = val.trim();
  return v.length > maxLen ? v.slice(0, maxLen) : v;
}

function normalizePhone(s) {
  return String(s || "").replace(/\s+/g, "");
}

function getAllowedOrigins() {
  const raw = process.env.ALLOWED_ORIGINS;
  const list = raw ? parseAddrList(raw) : DEFAULT_ALLOWED_ORIGINS;
  return new Set(list);
}

function isAllowedOrigin(origin) {
  if (!origin) return false;
  const allowed = getAllowedOrigins();
  return allowed.has(origin);
}

function setCors(res, origin) {
  // CORS strict – nu "*"
  if (origin && isAllowedOrigin(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ---------- validators (păstrăm logica ta + o facem mai safe) ----------
function isValidName(s) {
  const v = String(s || "").trim();
  // păstrez regula ta (min 7) – dacă vrei, o reduci
  return /^[A-Za-zĂÂÎȘȚăâîșț .'-]{7,60}$/.test(v);
}

function isValidPhone(s) {
  const v = normalizePhone(s);
  return /^(\+40|0)\d{9,10}$/.test(v);
}

function isValidEmail(s) {
  // la tine email e opțional (poate fi gol)
  if (!s) return true;
  return emailRe.test(String(s).trim());
}

function isValidService(s) {
  const v = String(s || "").trim();
  return !!v && v.length <= 80;
}

function isValidMessage(s) {
  // mesaj opțional, limitat
  if (!s) return true;
  return String(s).length <= 1000;
}

function isValidConsent(v) {
  if (typeof v === "boolean") return v === true;
  const s = String(v || "").toLowerCase();
  return s === "true" || s === "on" || s === "1";
}

// ---------- rate limit (best-effort per instance) ----------
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 min
const RATE_LIMIT_MAX = 10; // 10 req/min/IP (best-effort)
const rl = new Map();

function getClientIp(req) {
  // Cloudflare: cf-connecting-ip; Vercel: x-forwarded-for
  const cf = req.headers["cf-connecting-ip"];
  if (cf) return String(cf);
  const xff = req.headers["x-forwarded-for"];
  if (!xff) return "unknown";
  return String(xff).split(",")[0].trim() || "unknown";
}

function rateLimit(req) {
  const ip = getClientIp(req);
  const now = Date.now();
  const item = rl.get(ip) || { count: 0, start: now };

  if (now - item.start > RATE_LIMIT_WINDOW_MS) {
    rl.set(ip, { count: 1, start: now });
    return { ok: true };
  }

  item.count += 1;
  rl.set(ip, item);

  if (item.count > RATE_LIMIT_MAX) return { ok: false };
  return { ok: true };
}

// ---------- nodemailer transporter cache ----------
let cachedTransporter = null;

function getTransporter() {
  if (cachedTransporter) return cachedTransporter;

  const SMTP_PORT = safePort(process.env.SMTP_PORT, 587);

  // verificări minime de config
  if (
    !process.env.SMTP_HOST ||
    !process.env.SMTP_USER ||
    !process.env.SMTP_PASS
  ) {
    throw new Error("SMTP config missing");
  }

  cachedTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465, // SMTPS
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    // întărește TLS (fără să rupi providerii)
    tls: {
      minVersion: "TLSv1.2",
    },
  });

  return cachedTransporter;
}

// ---------- main handler ----------
export default async function handler(req, res) {
  const origin = req.headers.origin || "";
  setCors(res, origin);

  // security headers (simple)
  res.setHeader("X-Content-Type-Options", "nosniff");

  // acceptă doar POST/OPTIONS
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  // Origin allowlist (reduce abuz cross-site)
  if (!isAllowedOrigin(origin)) {
    return res.status(403).json({ ok: false });
  }

  // Content-Type strict
  const ct = req.headers["content-type"] || "";
  if (!ct.includes("application/json")) {
    return res.status(415).json({ ok: false });
  }

  // best-effort rate limit (important: Cloudflare should do real rate limiting)
  const rlOk = rateLimit(req);
  if (!rlOk.ok) {
    // răspuns neutru, fără detalii
    return res.status(429).json({ ok: false });
  }

  try {
    const body = req.body || {};

    // clamp + normalize (anti payload abuse)
    const name = clampString(body.name, 60);
    const phone = normalizePhone(clampString(body.phone, 30));
    const email = clampString(body.email, 254).toLowerCase();
    const service = clampString(body.service, 80);
    const message = clampString(body.message, 1000);
    const website = clampString(body.website, 200); // honeypot
    const consent = body.consent;

    // honeypot: răspuns “no content”
    if (website) return res.status(204).end();

    // CRLF protection (header injection)
    // email e folosit în text/templating, dar poate ajunge în replyTo dacă alegi
    if (hasCRLF(name) || hasCRLF(phone) || hasCRLF(email) || hasCRLF(service)) {
      return res.status(422).json({ ok: false, errors: ["Date invalide."] });
    }

    const errors = [];
    if (!isValidName(name))
      errors.push("Nume invalid (7-60, doar litere, spațiu, - . ').");
    if (!isValidPhone(phone)) errors.push("Telefon invalid (RO).");
    if (!isValidEmail(email)) errors.push("Email invalid.");
    if (!isValidService(service)) errors.push("Selectează un serviciu.");
    if (!isValidMessage(message)) errors.push("Mesaj prea lung (max 1000).");
    if (!isValidConsent(consent))
      errors.push("Trebuie să îți dai acordul pentru prelucrarea datelor.");

    if (errors.length) return res.status(422).json({ ok: false, errors });

    // destinatari
    const toList = parseAddrList(process.env.CLINIC_TO).filter((a) =>
      emailRe.test(a),
    );
    if (toList.length === 0) {
      // nu expune detalii
      return res
        .status(500)
        .json({ ok: false, error: "Server not configured" });
    }

    // HTML + text (păstrăm funcționalitatea)
    const emailElement = React.createElement(AppointmentEmail, {
      name,
      phone,
      email,
      service,
      message,
    });

    const htmlBody = "<!doctype html>" + renderToStaticMarkup(emailElement);

    const textBody =
      `Programare nouă\n` +
      `Nume: ${name}\n` +
      `Telefon: ${phone}\n` +
      `Email: ${email || "-"}\n` +
      `Serviciu: ${service || "-"}\n\n` +
      (message ? `Mesaj:\n${message}\n` : "");

    // subject safe: fără CRLF + limită lungime
    const safeSubjectName = clampString(name, 60).replace(/\s+/g, " ");
    const safeSubjectService = clampString(
      service || "Nespecificat",
      80,
    ).replace(/\s+/g, " ");
    const subject = `Programare: ${safeSubjectName} — ${safeSubjectService}`;

    const transporter = getTransporter();

    // IMPORTANT: nu pune user input în "from"
    const fromEmail = process.env.SMTP_USER;

    const mail = {
      from: `Clinica Cardio <${fromEmail}>`,
      to: toList.join(", "),
      subject,
      text: textBody,
      html: htmlBody,
      envelope: { from: fromEmail, to: toList },
    };

    // (opțional, dar ok) replyTo doar dacă email valid & fără CRLF (deja validat)
    if (email) {
      mail.replyTo = email;
    }

    await transporter.sendMail(mail);

    return res.json({ ok: true });
  } catch (e) {
    // log intern minimal (fără PII, fără req.body)
    console.error("Mail failed:", e?.message || e);

    // răspuns “safe”
    return res.status(500).json({ ok: false, error: "Mail failed" });
  }
}
