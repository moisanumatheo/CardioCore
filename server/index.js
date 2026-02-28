import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import nodemailer from "nodemailer";
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
}

/* ───────────── ENV & utilitare ───────────── */
const { SMTP_HOST, SMTP_USER, SMTP_PASS, CLINIC_TO, CLINIC_BCC, SMTP_DEBUG } =
  process.env;

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

/* ───────────── Nodemailer ───────────── */
const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT === 465,
  auth: { user: SMTP_USER, pass: SMTP_PASS },
  logger: !!SMTP_DEBUG,
  debug: !!SMTP_DEBUG,
});

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
  if (typeof v === "boolean") return v === true;
  const s = String(v || "").toLowerCase();
  return s === "true" || s === "on" || s === "1";
}

/* ───────────── Endpoint formular ───────────── */
app.post("/api/contact", async (req, res) => {
  try {
    const { name, phone, email, service, message, website, consent } =
      req.body || {};
    if (website) return res.status(204).end();

    const errors = [];
    if (!isValidName(name)) errors.push("Nume invalid.");
    if (!isValidPhone(phone)) errors.push("Telefon invalid.");
    if (!isValidEmail(email)) errors.push("Email invalid.");
    if (!isValidService(service)) errors.push("Selectează un serviciu.");
    if (!isValidConsent(consent)) errors.push("Acordul este necesar.");

    if (errors.length) return res.status(422).json({ ok: false, errors });

    const toList = parseAddrList(CLINIC_TO).filter((a) => emailRe.test(a));
    const bccList = parseAddrList(CLINIC_BCC).filter((a) => emailRe.test(a));

    if (toList.length === 0) {
      return res.status(500).json({ ok: false, error: "Destinatar invalid" });
    }

    // AICI S-A SCHIMBAT: Folosim doar funcția care returnează string-ul HTML
    const htmlBody = getAppointmentEmailHtml({
      name,
      phone,
      email,
      service,
      message,
    });

    const textBody = `Programare nouă\nNume: ${name}\nTelefon: ${phone}\nEmail: ${email || "-"}\nServiciu: ${service}\n\n${message || ""}`;

    await transporter.sendMail({
      from: `Clinica CardioCore <${SMTP_USER}>`,
      to: toList.join(", "),
      bcc: bccList.length ? bccList.join(", ") : undefined,
      subject: `Programare: ${name} — ${service}`,
      text: textBody,
      html: htmlBody,
    });

    return res.json({ ok: true });
  } catch (e) {
    console.error("SMTP error:", e);
    return res.status(500).json({ ok: false, error: "Mail failed" });
  }
});

app.listen(PORT, () => console.log("API running on port " + PORT));
