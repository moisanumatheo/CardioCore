import { useEffect, useRef } from "react";
import { SITE } from "../data/site";
import Seo from "../components/Seo.jsx"; // ⬅️ SEO component

export default function Services() {
  const items = SITE.services;

  // refs pe secțiuni reale: header, include, detalii
  const refHead = useRef([]);
  const refIncl = useRef([]);
  const refDet = useRef([]);

  useEffect(() => {
    function colsForWidth(w) {
      if (w >= 1024) return 3; // lg:grid-cols-3
      if (w >= 640) return 2; // sm:grid-cols-2
      return 1;
    }
    function equalize() {
      const cols = colsForWidth(window.innerWidth);
      [refHead, refIncl, refDet].forEach((r) =>
        r.current.forEach((el) => {
          if (el) el.style.minHeight = "0px";
        })
      );
      for (let i = 0; i < items.length; i += cols) {
        const H = refHead.current.slice(i, i + cols).filter(Boolean);
        const I = refIncl.current.slice(i, i + cols).filter(Boolean);
        const T = refDet.current.slice(i, i + cols).filter(Boolean);
        const hH = Math.max(...H.map((el) => el.offsetHeight), 0);
        const hI = Math.max(...I.map((el) => el.offsetHeight), 0);
        const hT = Math.max(...T.map((el) => el.offsetHeight), 0);
        H.forEach((el) => (el.style.minHeight = hH + "px"));
        I.forEach((el) => (el.style.minHeight = hI + "px"));
        T.forEach((el) => (el.style.minHeight = hT + "px"));
      }
    }
    equalize();
    window.addEventListener("resize", equalize);
    window.addEventListener("load", equalize);
    const t = setTimeout(equalize, 200);
    return () => {
      window.removeEventListener("resize", equalize);
      window.removeEventListener("load", equalize);
      clearTimeout(t);
    };
  }, [items.length]);

  const setRef = (refArray, idx) => (el) => {
    refArray.current[idx] = el;
  };

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      {/* SEO pentru pagina de servicii */}
      <Seo
        title="CardioCore"
        description="Servicii de cardiologie la CardioCore: consultație cardiologică, EKG de repaus, ecocardiografie Doppler, test de efort, Holter ECG și monitorizare tensională ambulatorie. Investigații complete bazate pe ghiduri actuale și interpretare realizată de medici specialiști."
      />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-8">
        <h1 className="text-3xl md:text-4xl font-bold">
          Servicii <span className="text-[var(--brand)]">Cardiologie</span>
        </h1>

        <div className="mt-3 text-[15px] leading-relaxed text-[var(--muted)] max-w-2xl">
          <p>
            Investigații și consultații complete, bazate pe ghiduri actuale.
            Lista de mai jos reflectă serviciile pe care le oferim la{" "}
            {SITE.name}.
          </p>
          <p className="mt-2">
            Pentru alte întrebări sau solicitări, scrie-ne la{" "}
            <a
              className="text-[var(--brand)] underline underline-offset-4 decoration-2"
              href={`mailto:${SITE.email}`}
            >
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </section>

      {/* GRID SERVICII */}
      <section className="mx-auto max-w-7xl px-4 pb-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((s, idx) => (
            <article
              key={s.id}
              className="group card p-4 hover:shadow-sm transition flex flex-col h-full min-h-[540px]"
            >
              {/* Header (ikon + titlu + descriere) */}
              <div ref={setRef(refHead, idx)}>
                <div className="flex items-start gap-3">
                  <span
                    className="size-9 grid place-items-center rounded-lg text-[var(--brand)]
                                   bg-[color:color-mix(in_srgb,var(--brand)_14%,transparent)]"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      className="size-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M3 12h4l2-5 4 10 2-5h6" />
                    </svg>
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-medium leading-tight">{s.title}</h3>
                    <p className="text-sm text-[var(--muted)]">{s.desc}</p>
                  </div>
                </div>
              </div>

              {/* bară 1 */}
              <div className="my-4 border-t border-[color:color-mix(in_srgb,var(--ink)_12%,transparent)]" />

              {/* Include */}
              <div ref={setRef(refIncl, idx)}>
                <div className="text-xs font-medium text-[var(--ink)]/70 mb-1">
                  Include:
                </div>
                <ul className="space-y-1 text-sm text-[var(--muted)]">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="mt-1 size-1.5 rounded-full bg-[var(--brand)] shrink-0" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* bară 2 */}
              <div className="my-4 border-t border-[color:color-mix(in_srgb,var(--ink)_12%,transparent)]" />

              {/* Detalii */}
              <div ref={setRef(refDet, idx)}>
                <div className="text-xs font-medium text-[var(--ink)]/70 mb-1">
                  Detalii
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-[var(--muted)]">
                  {s.duration && (
                    <div>
                      <span className="font-medium text-[var(--ink)]">
                        Durată:
                      </span>{" "}
                      {s.duration}
                    </div>
                  )}
                  {s.price && (
                    <div>
                      <span className="font-medium text-[var(--ink)]">
                        Preț:
                      </span>{" "}
                      {s.price}
                    </div>
                  )}
                  {s.prep && (
                    <div className="col-span-2">
                      <span className="font-medium text-[var(--ink)]">
                        Pregătire pacient:
                      </span>{" "}
                      {s.prep}
                    </div>
                  )}
                  {s.contraindications && (
                    <div className="col-span-2">
                      <span className="font-medium text-[var(--ink)]">
                        Contraindicații:
                      </span>{" "}
                      {s.contraindications}
                    </div>
                  )}
                  {s.policy && (
                    <div className="col-span-2">
                      <span className="font-medium text-[var(--ink)]">
                        Politică anulare:
                      </span>{" "}
                      {s.policy}
                    </div>
                  )}
                </div>
              </div>

              {/* bară 3 */}
              <div className="my-4 border-t border-[color:color-mix(in_srgb,var(--ink)_12%,transparent)]" />

              {/* Footer jos */}
              <div className="mt-auto flex justify-end">
                <a href="/contact" className="btn-brand">
                  Programează-te
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="cta-bar bg-[var(--brand)] text-white rounded-[var(--radius)] overflow-hidden px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-white/10">
          <div className="text-base font-medium">
            Ai grijă de inima ta — fă primul pas azi.
          </div>
          <div className="flex items-center gap-3">
            <a href="/contact" className="btn-ghost on-brand">
              Contactează-ne
            </a>
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="btn-white"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* FAQ (din site.js) */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-xl font-semibold">Întrebări frecvente</h2>
        <div className="mt-4 grid md:grid-cols-2 gap-4">
          {SITE.faqServices.map(({ q, a }) => (
            <div key={q} className="p-4 bg-white border rounded-xl">
              <div className="font-medium">{q}</div>
              <div className="text-sm text-[var(--muted)] mt-1">{a}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
