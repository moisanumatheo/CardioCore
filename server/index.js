// server/index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import * as dns from "dns/promises";
import { getAppointmentEmailHtml } from "./emails/getAppointmentEmail.js";
const app = express();

/* ───────────── DEV middlewares ───────────── */
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "OPTIONS"],
  }),
);
app.use(express.json({ limit: "200kb" }));
app.use((req, _res, next) => {
  console.log(new Date().toISOString(), req.method, req.url);
  next();
});

const isProd = process.env.NODE_ENV === "production";
if (isProd) {
  app.set("trust proxy", 1);
  const PROD_ORIGINS = (process.env.ALLOWED_ORIGINS || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  app.use(
    cors({
      origin: PROD_ORIGINS,
      methods: ["GET", "POST", "OPTIONS"],
      credentials: false,
    }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: { policy: "same-site" },
    }),
  );
  app.use(
    "/api/contact",
    rateLimit({
      windowMs: 60_000,
      max: 5,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );
  app.use((req, res, next) => {
    res.setHeader(
      "Content-Security-Policy",
      [
        "default-src 'none'",
        "connect-src 'self'",
        "img-src 'self' data:",
        "frame-ancestors 'none'",
        "base-uri 'none'",
        "form-action 'self'",
      ].join("; "),
    );
    res.setHeader("Referrer-Policy", "no-referrer");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=()",
    );
    next();
  });
}

/* ───────────── ENV & utilitare ───────────── */
const {
  SMTP_HOST,
  SMTP_USER,
  SMTP_PASS,
  CLINIC_TO, // ex.: "programari@clinicata.ro" sau "cont@gmail.com"
  CLINIC_BCC,
  SMTP_DEBUG, // "1" ca să vezi dialogul SMTP
} = process.env;

function safePort(val, fallback) {
  const n = parseInt(String(val ?? "").trim(), 10);
  return Number.isFinite(n) && n > 0 && n < 65536 ? n : fallback;
}
const SMTP_PORT = safePort(process.env.SMTP_PORT, 587);
const PORT = safePort(process.env.PORT, 3001);

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const parseAddrList = (s) =>
  String(s || "")
    .split(",")
    .map((x) => x.trim())
    .filter(Boolean);

/* ───────────── Nodemailer (dinamic: 465=SSL, 587=STARTTLS) ───────────── */
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465, // true doar pentru 465 (SSL)
  requireTLS: SMTP_PORT === 587, // STARTTLS pe 587
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  logger: !!SMTP_DEBUG,
  debug: !!SMTP_DEBUG,
});

transporter.verify((err) => {
  if (err) console.error("SMTP verify failed:", err);
  else console.log("SMTP ready");
});

/* ───────────── Health ───────────── */
app.get("/api/health", (_req, res) => res.json({ ok: true }));

/* ───────────── Validatori ───────────── */
function isValidName(s) {
  return /^[A-Za-zĂÂÎȘȚăâîșț .'-]{7,60}$/.test(String(s || "").trim());
}
function isValidPhone(s) {
  return /^(\+40|0)\d{9,10}$/.test(String(s || "").replace(/\s+/g, ""));
}
function isValidEmail(s) {
  return !s || emailRe.test(String(s));
}
function isValidService(s) {
  return !!s && String(s).length <= 80;
}
function isValidMessage(s) {
  return !s || String(s).length <= 1000;
}
function isValidConsent(v) {
  // acceptăm boolean true sau valori uzuale din formular
  if (typeof v === "boolean") return v === true;
  const s = String(v || "").toLowerCase();
  return s === "true" || s === "on" || s === "1";
}

/* ───────────── Endpoint formular ───────────── */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, email, service, message, website, consent } =
      req.body || {};
    if (website) return res.status(204).end(); // honeypot

    const errors = [];
    if (!isValidName(name))
      errors.push("Nume invalid (7-60, doar litere, spațiu, - . ').");
    if (!isValidPhone(phone)) errors.push("Telefon invalid (RO).");
    if (!isValidEmail(email)) errors.push("Email invalid.");
    if (!isValidService(service)) errors.push("Selectează un serviciu.");
    if (!isValidMessage(message)) errors.push("Mesaj prea lung (max 1000).");
    if (!isValidConsent(consent))
      errors.push("Trebuie să îți dai acordul pentru prelucrarea datelor."); // 👈 NOU

    if (errors.length) return res.status(422).json({ ok: false, errors });

    const toList = parseAddrList(CLINIC_TO).filter((a) => emailRe.test(a));
    const bccList = parseAddrList(CLINIC_BCC).filter((a) => emailRe.test(a));
    if (toList.length === 0) {
      console.error("CLINIC_TO invalid/empty:", CLINIC_TO);
      return res.status(500).json({ ok: false, error: "Destinatar invalid" });
    }

    // HTML (template) + text fallback
    const emailElement = React.createElement(AppointmentEmail, {
      name,
      phone,
      email,
      service,
      message,
    });
    const htmlBody = getAppointmentEmailHtml({
      name,
      phone,
      email,
      service,
      message,
    });
    const textBody =
      `Programare nouă\n` +
      `Nume: ${name}\n` +
      `Telefon: ${phone}\n` +
      `Email: ${email || "-"}\n` +
      `Serviciu: ${service || "-"}\n\n` +
      (message ? `Mesaj:\n${message}\n` : "");

    // DEBUG minimal
    console.log("MAIL DEBUG → from:", SMTP_USER);
    console.log("MAIL DEBUG → to:", toList);
    console.log("MAIL DEBUG → bcc:", bccList);

    const info = await transporter.sendMail({
      from: `Clinica Cardio <${SMTP_USER}>`, // branding în antetul vizibil
      to: toList.join(", "),
      subject: `Programare: ${name} — ${service || "Nespecificat"}`,
      text: textBody,
      html: htmlBody,
      envelope: { from: SMTP_USER, to: toList }, // RCPT clar
      // replyTo: email && emailRe.test(email) ? email : undefined, // (activează după ce confirmi stabilitatea)
    });

    console.log("MAIL SENT →", info.accepted, info.rejected, info.response);
    return res.json({ ok: true });
  } catch (e) {
    console.error("SMTP send error:", e?.response || e?.message, e);
    return res.status(500).json({ ok: false, error: "Mail failed" });
  }
});

/* ───────────── Start server ───────────── */
app.listen(PORT, () => {
  console.log("API running on http://localhost:" + PORT);
});
