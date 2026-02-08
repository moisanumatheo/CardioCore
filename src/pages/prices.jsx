import { Link } from "react-router-dom";
import { SITE } from "../data/site";
import Seo from "../components/Seo.jsx";

export default function Preturi() {
  const p = SITE.pricing;
  const [docA, docB] = p.doctors || [];

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <Seo
        title="CardioCore — Prețuri"
        description="Lista de prețuri CardioCore pentru consultații și investigații cardiologice."
      />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Prețuri <span className="text-[var(--brand)]">CardioCore</span>
        </h1>

        {p?.note && (
          <p className="mt-3 text-[15px] text-[var(--muted)] max-w-2xl">
            {p.note}
          </p>
        )}

        {p?.updatedAt && (
          <div className="mt-3 text-xs text-[var(--muted)]">
            Actualizat: {p.updatedAt}
          </div>
        )}
      </section>

      {/* TABLE */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="card p-4 md:p-6 overflow-x-auto">
          <table className="min-w-[760px] w-full text-sm">
            <thead>
              <tr className="text-left border-b">
                <th className="py-3 pr-4">Serviciu</th>
                <th className="py-3 pr-4 whitespace-nowrap">
                  {docA || "Medic"}
                </th>
                <th className="py-3 pr-4 whitespace-nowrap">
                  {docB || "Medic"}
                </th>
              </tr>
            </thead>

            <tbody>
              {(p?.items || []).map((it) => (
                <tr key={it.service} className="border-b last:border-b-0">
                  <td className="py-3 pr-4 text-[var(--ink)]">{it.service}</td>

                  <td className="py-3 pr-4 whitespace-nowrap text-[var(--muted)]">
                    {typeof it.a === "number" ? `${it.a} ${p.currency}` : "—"}
                  </td>

                  <td className="py-3 pr-4 whitespace-nowrap text-[var(--muted)]">
                    {typeof it.b === "number" ? `${it.b} ${p.currency}` : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="mt-6 cta-bar bg-[var(--brand)] text-white rounded-[var(--radius)] px-4 md:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-4 ring-1 ring-white/10">
          <div className="text-base font-medium">
            Pentru confirmarea prețului și disponibilitate, contactează-ne.
          </div>

          <div className="flex items-center gap-3">
            <Link to="/contact" className="btn-ghost on-brand">
              Contactează-ne
            </Link>

            <a
              href={`tel:${String(SITE.phone || "").replace(/\s+/g, "")}`}
              className="btn-white"
            >
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
