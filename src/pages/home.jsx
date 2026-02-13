import { Link } from "react-router-dom";
import EKGCard from "../components/ekg-card.jsx";
import ReviewsCarousel from "../components/reviews-carousel.jsx";
import { SITE, REVIEWS as REVIEWS_DATA } from "../data/site";
import Seo from "../components/Seo.jsx";

const REVIEWS = REVIEWS_DATA.map((r) =>
  r.author ? `${r.text} — ${r.author}` : r.text,
);

export default function Home() {
  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      {/* SEO pentru homepage */}
      <Seo
        title="CardioCore"
        description="CardioCore - clinică de cardiologie în București. Cardiologie modernă cu suflet: consult cardiologic, EKG, ecocardiografie Doppler, test de efort, Holter ECG și monitorizare tensională. Programări rapide și grijă autentică pentru fiecare pacient."
      />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-base font-large px-4 py-3 rounded-full bg-[var(--brand)]/10 text-[var(--brand)] ring-1 ring-[var(--brand)]/20">
            {SITE.name} — {SITE.slogan}
          </span>

          <p className="mt-4 text-[15px] text-[var(--muted)] max-w-prose">
            Cardiologie modernă cu suflet – expertiză medicală, tehnologie de
            vârf și grijă autentică pentru fiecare pacient. La {SITE.name},
            combinăm precizia medicală cu empatia umană. Fiecare pacient
            primește atenția și timpul necesar unei evaluări cardiologice
            complete.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/contact" className="btn-brand">
              Programează-te acum
            </Link>

            <Link
              to="/echipa"
              className="px-4 py-2 rounded-md border text-sm hover:bg-white"
            >
              Descoperă echipa noastră
            </Link>
          </div>

          <ul className="mt-8 grid grid-cols-2 md:grid-cols-2 gap-4">
            {[
              {
                k: "Expertiză confirmată",
                t: "Medici primari și specialiști dedicați cardiologiei moderne.",
              },
              {
                k: "Investigații complete",
                t: "EKG, ecocardiografie Doppler, test de efort, Holter ECG și TA ambulatorie/24 h.",
              },
              {
                k: "Precizie & tehnologie",
                t: "Diagnostic corect prin echipamente performante și interpretare de top.",
              },
              {
                k: "Abordare personalizată",
                t: "Prevenție, imagistică, cardiologie oncologică și recuperare.",
              },
            ].map((s) => (
              <li key={s.k} className="p-4 rounded-xl bg-white border">
                <div className="font-medium">{s.k}</div>
                <div className="text-xs text-[var(--muted)]">{s.t}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* vizual */}
        <div className="relative">
          <EKGCard animated={true} />
          <div className="absolute -bottom-5 -left-5 card p-4">
            <div className="text-sm font-medium">EKG & Ecocardiografie</div>
            <div className="text-xs text-[var(--muted)]">
              Interpretare în aceeași zi
            </div>
          </div>
        </div>
      </section>

      {/* Servicii populare */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <h2 className="text-xl font-semibold">Servicii populare</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              t: "Consultație cardiologică",
              d: "Evaluare clinică completă + plan personalizat",
            },
            {
              t: "EKG de repaus",
              d: "Rezultat rapid, interpretare de specialist",
            },
            {
              t: "Ecocardiografie Doppler",
              d: "Structuri și funcție cardiacă, color & spectral",
            },
            {
              t: "Holter ECG/TA",
              d: "Monitorizare 24–48h, raport și recomandări",
            },
          ].map((c) => (
            <Link
              key={c.t}
              to="/servicii"
              className="group card p-4 hover:translate-y-0.5 transition-transform"
            >
              <div
                className="size-10 anim-float grid place-items-center rounded-lg mb-3
                              text-[var(--brand)]
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
              </div>
              <div className="font-medium">{c.t}</div>
              <div className="text-sm text-[var(--muted)]">{c.d}</div>
              <div className="mt-3 text-sm text-[var(--brand)] group-hover:underline">
                Detalii →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BAR */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div
          className="cta-bar bg-[var(--brand)] text-white rounded-[var(--radius)] overflow-hidden px-4 md:px-6 py-5
                        flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-white/10"
        >
          <div className="text-base font-medium">
            Programează-te acum pentru un control cardiologic complet.
          </div>
          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-ghost on-brand">
              Contactează-ne
            </Link>

            {/* aici rămâne <a> fiindcă e link extern (tel:) */}
            <a
              href={`tel:${SITE.phone.replace(/\s+/g, "")}`}
              className="btn-white"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Recenzii din brief */}
      <ReviewsCarousel items={REVIEWS} interval={4500} />
    </div>
  );
}
