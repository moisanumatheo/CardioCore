import { useState } from "react";
import { SITE } from "../data/site";
import Seo from "../components/Seo.jsx";

const API_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL || "http://localhost:3001"
  : "";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setSent(false);

    const form = e.currentTarget;
    const fd = new FormData(form);

    if (fd.get("website")) return;

    const name = (fd.get("name") || "").toString().trim();
    const phone = (fd.get("phone") || "").toString().replace(/\s+/g, "");
    const email = (fd.get("email") || "").toString().trim();
    const service = (fd.get("service") || "").toString();
    const message = (fd.get("message") || "").toString();
    const consent = fd.get("consent") === "on";

    const reName = /^[A-Za-zĂÂÎȘȚăâîșț .'-]{3,60}$/;
    const rePhone = /^(\+40|0)\d{9,10}$/;
    const reEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const localErrors = [];
    if (!reName.test(name))
      localErrors.push("Nume invalid (3–60, litere/spațiu/-.' ).");
    if (!rePhone.test(phone))
      localErrors.push("Telefon invalid (RO: +40… sau 0…).");
    if (email && !reEmail.test(email)) localErrors.push("Email invalid.");
    if (!service) localErrors.push("Te rugăm să alegi serviciul.");
    if (!consent)
      localErrors.push(
        "Trebuie să îți dai acordul pentru prelucrarea datelor.",
      );

    if (localErrors.length) {
      setErrors(localErrors);
      return;
    }

    const payload = {
      name,
      phone,
      email,
      service,
      message,
      website: "",
      consent,
    };

    setLoading(true);
    try {
      const r = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await r.text();
      let data = null;
      try {
        data = JSON.parse(text);
      } catch {
        data = null;
      }

      if (!r.ok || !data?.ok) {
        const msg =
          (data && (data.errors?.join("\n") || data.error)) ||
          "Eroare la trimitere.";
        throw new Error(msg);
      }

      form.reset();
      setSent(true);
    } catch (err) {
      console.error(err);
      setErrors([
        err?.message || "Nu am putut trimite mesajul. Încearcă din nou.",
      ]);
    } finally {
      setLoading(false);
    }
  }

  const services = (SITE.services || []).map((s) => s.title);

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <Seo
        title="Programări Cardiologie București | Contact – CardioCore"
        description="Programează-te la CardioCore – clinică cardiologie București, Voluntari (zona Pipera). Consultații cu Dr. Cuculici Andreea și Dr. Pîrîianu-Masgras Bianca. Tel: +40 758 640 016. Completează formularul online pentru programare rapidă."
        canonical="https://cardiocore.ro/contact"
      />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          <span className="text-[var(--brand)]">Contact & Programări</span>
        </h1>
        <p className="mt-3 text-[15px] text-[var(--muted)] max-w-prose">
          Completează formularul și revenim în cel mult 24&nbsp;h. Pentru
          urgențe, sună direct.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 grid lg:grid-cols-2 gap-8">
        {/* COL STÂNGA */}
        <div className="space-y-4">
          <div className="rounded-xl bg-white border p-4">
            <div className="text-sm text-[var(--muted)]">Adresă</div>
            <div className="font-medium">{SITE.address?.line}</div>
            <a
              href={SITE.address?.mapsEmbedUrl}
              target="_blank"
              rel="noopener"
              className="mt-1 inline-block text-[var(--brand)] hover:underline text-sm"
            >
              Vezi pe Google Maps →
            </a>
          </div>

          <div className="rounded-xl bg-white border p-4">
            <div className="text-sm text-[var(--muted)]">Program</div>
            {SITE.hours?.map((h) => (
              <div key={h.days + h.time} className="font-medium">
                {h.days} {h.time}
              </div>
            ))}
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white border p-4">
              <div className="text-sm text-[var(--muted)]">Telefon</div>
              <div className="mt-1 flex flex-col gap-1">
                {SITE.phone?.map((phone) => (
                  <a
                    key={phone}
                    href={`tel:${phone.replace(/\s+/g, "")}`}
                    className="font-medium text-[var(--brand)] hover:underline"
                  >
                    {phone}
                  </a>
                ))}
              </div>
            </div>
            <a
              href={`mailto:${SITE.email}`}
              className="rounded-xl bg-white border p-4 hover:shadow-sm transition"
            >
              <div className="text-sm text-[var(--muted)]">Email</div>
              <div className="font-medium">{SITE.email}</div>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border">
            <iframe
              title="CardioCore — Hartă"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d355.75969776883977!2d26.1229844!3d44.4930771!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b203c48eaf9361%3A0x8bbebe3b85ddc5e!2sCardioCore!5e0!3m2!1sen!2sro!4v1775732532727!5m2!1sen!2sro"
              width="100%"
              height="280"
              loading="lazy"
              className="block"
              style={{ border: 0 }}
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>

        {/* COL DREAPTA */}
        <div className="rounded-2xl bg-white border p-5 md:p-6">
          {sent && (
            <div
              className="mb-4 rounded-md px-4 py-3 text-sm text-[var(--brand)] bg-[color:color-mix(in_srgb,var(--brand)_12%,transparent)] border border-[color:color-mix(in_srgb,var(--brand)_20%,transparent)]"
              role="status"
              aria-live="polite"
            >
              Mulțumim! Cererea ta a fost înregistrată — revenim în 24&nbsp;h.
            </div>
          )}

          {errors.length > 0 && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 text-red-700 text-sm px-3 py-2">
              {errors.map((e, i) => (
                <div key={i}>• {e}</div>
              ))}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            <input
              type="text"
              name="website"
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm text-[var(--muted)] mb-1"
                  htmlFor="name"
                >
                  Nume complet *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  pattern="[A-Za-zĂÂÎȘȚăâîșț .'-]{3,60}"
                  title="3–60 caractere, litere, spațiu, cratimă, punct, apostrof"
                  placeholder="Ex: Popescu Andrei"
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ring-[var(--brand)]"
                />
              </div>

              <div>
                <label
                  className="block text-sm text-[var(--muted)] mb-1"
                  htmlFor="phone"
                >
                  Telefon *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  pattern="(\+40|0)\d{9,10}"
                  title="Format România: +40XXXXXXXXX sau 0XXXXXXXXX"
                  placeholder="+40 ..."
                  className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ring-[var(--brand)]"
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm text-[var(--muted)] mb-1"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="exemplu@domeniu.ro"
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ring-[var(--brand)]"
              />
            </div>

            <div>
              <label
                className="block text-sm text-[var(--muted)] mb-1"
                htmlFor="service"
              >
                Serviciu *
              </label>
              <select
                id="service"
                name="service"
                required
                defaultValue=""
                className="w-full rounded-md border px-3 py-2 outline-none bg-white focus:ring-2 ring-[var(--brand)]"
              >
                <option value="" disabled>
                  Alege o opțiune…
                </option>
                {services.length ? (
                  services.map((t) => <option key={t}>{t}</option>)
                ) : (
                  <>
                    <option>Consultație cardiologică</option>
                    <option>EKG de repaus</option>
                    <option>Ecocardiografie</option>
                    <option>Holter EKG/TA</option>
                    <option>Test de efort</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label
                className="block text-sm text-[var(--muted)] mb-1"
                htmlFor="message"
              >
                Mesaj (simptome / detalii)
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                maxLength={1000}
                className="w-full rounded-md border px-3 py-2 outline-none focus:ring-2 ring-[var(--brand)] resize-y"
                placeholder="Ex: durere toracică la efort, palpitații, amețeală..."
              />
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                id="consent"
                name="consent"
                type="checkbox"
                className="mt-0.5 accent-[var(--brand)]"
              />
              <span>
                Sunt de acord cu prelucrarea datelor personale pentru programare
                și comunicare.
              </span>
            </label>

            <div className="pt-4">
              <div className="bg-[var(--brand)] text-white rounded-[var(--radius)] px-4 py-4 ring-1 ring-white/10 flex flex-col sm:flex-row items-center justify-center gap-3">
                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    aria-busy={loading ? "true" : "false"}
                    className="btn-ghost on-brand no-underline disabled:opacity-60"
                  >
                    {loading ? "Se trimite..." : "Programează-te"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
