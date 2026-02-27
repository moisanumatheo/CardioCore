import { useEffect, useState } from "react";
import { LEGAL } from "../data/site";
const KEY = "cc_consent_v1";

export default function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    if (!saved) setOpen(true);
  }, []);

  // blochează scroll când e deschis
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [open]);

  if (!open) return null;

  function accept() {
    if (!agreed) {
      setError(
        "Nu poți continua fără acordul pentru prelucrarea datelor. Bifează căsuța de mai jos.",
      );
      return;
    }

    localStorage.setItem(
      KEY,
      JSON.stringify({
        necessary: true,
        consent: true,
        ts: Date.now(),
      }),
    );
    setOpen(false);
  }

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* modal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-3xl rounded-2xl border bg-white shadow-lg overflow-hidden">
          <div className="p-5 border-b">
            <div className="text-lg font-semibold">
              Consimțământ – Confidențialitate & Cookie-uri
            </div>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Folosim cookie-uri necesare pentru funcționarea site-ului. Prin
              continuare, confirmi că ai citit și accepți Politica de prelucrare
              a datelor și Politica de cookie-uri.
            </p>
          </div>

          {/* conținut scrollabil */}
          <div className="p-5 space-y-4">
            <div className="rounded-xl border bg-[color:color-mix(in_srgb,var(--bg)_75%,white)] p-4 max-h-[45vh] overflow-auto">
              <h3 className="font-semibold">{LEGAL.privacyTitle}</h3>
              <div className="mt-2 space-y-2 text-sm text-[var(--ink)]/80">
                <div className="font-medium">{LEGAL.companyHeader}</div>

                {LEGAL.privacyParagraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                className="mt-0.5 accent-[var(--brand)]"
                checked={agreed}
                onChange={(e) => {
                  setAgreed(e.target.checked);
                  if (e.target.checked) setError("");
                }}
              />
              <span>
                Sunt de acord cu prelucrarea datelor personale conform politicii
                de mai sus.
              </span>
            </label>

            {error && (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={accept}
                className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold
           bg-[var(--brand)] text-white hover:opacity-90 transition"
              >
                Accept
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
