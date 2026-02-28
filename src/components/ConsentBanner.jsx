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
      JSON.stringify({ necessary: true, consent: true, ts: Date.now() }),
    );
    setOpen(false);
  }

  return (
    /* 1. Am adăugat overflow-y-auto pe containerul fix */
    <div className="fixed inset-0 z-50 overflow-y-auto outline-none focus:outline-none">
      {/* 2. Overlay-ul rămâne fix în spatele scroll-ului */}
      <div className="fixed inset-0 bg-black/40" aria-hidden="true" />

      {/* 3. Containerul flexibil acum permite scroll-ul interior */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6">
        {/* 4. Modalul propriu-zis */}
        <div className="relative w-full max-w-3xl rounded-2xl border bg-white shadow-2xl flex flex-col my-auto">
          {/* Header */}
          <div className="p-5 border-b shrink-0">
            <h2 className="text-lg font-semibold text-gray-900">
              Consimțământ – Confidențialitate & Cookie-uri
            </h2>
          </div>

          {/* Conținut */}
          <div className="p-5 space-y-4">
            {/* Pe mobile reducem max-h-ul puțin pentru a lăsa loc butoanelor sub el */}
            <div className="rounded-xl border bg-gray-50 p-4 max-h-[40vh] sm:max-h-[45vh] overflow-y-auto text-[var(--ink)]/80">
              <h3 className="font-semibold text-gray-900">
                {LEGAL.privacyTitle}
              </h3>
              <div className="mt-2 space-y-2 text-sm">
                <div className="font-medium">{LEGAL.companyHeader}</div>
                {LEGAL.privacyParagraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>
            </div>

            {/* Secțiune Acord */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm cursor-pointer group">
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4 shrink-0 rounded border-gray-300 accent-[var(--brand)]"
                  checked={agreed}
                  onChange={(e) => {
                    setAgreed(e.target.checked);
                    if (e.target.checked) setError("");
                  }}
                />
                <span className="select-none">
                  Sunt de acord cu prelucrarea datelor personale conform
                  politicii de mai sus.
                </span>
              </label>

              {error && (
                <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 animate-in fade-in zoom-in duration-200">
                  {error}
                </div>
              )}
            </div>

            {/* Buton Accept */}
            <div className="flex justify-end pt-2">
              <button
                onClick={accept}
                className="w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold
                           bg-[var(--brand)] text-white hover:brightness-110 active:scale-[0.98] 
                           transition-all shadow-md shadow-[var(--brand)]/20"
              >
                Acceptă și continuă
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
