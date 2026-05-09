import { Link } from "react-router-dom";
import CtaPhones from "../components/CtaPhones.jsx";
import { SITE } from "../data/site";
import Seo from "../components/Seo.jsx";

function PriceCell({ value, currency }) {
  return (
    <span className="font-medium text-[var(--ink)]">
      {typeof value === "number" ? `${value} ${currency}` : "—"}
    </span>
  );
}

export default function Preturi() {
  const p = SITE.pricing;
  const [docA, docB] = p?.doctors || [];

  const items = p?.items || [];
  const currency = p?.currency || "lei";

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <Seo
        title="Prețuri Cardiologie București | Consultații, EKG, Ecocardiografie – CardioCore"
        description="Prețuri consultații și investigații cardiologice la CardioCore București: EKG 100 lei, consult cardiologic 300 lei, ecocardiografie Doppler 400 lei, Holter EKG 350–700 lei, test de efort 400 lei. Lista completă de prețuri."
        canonical="https://cardiocore.ro/preturi"
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
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12">
        {/* MOBILE: Cards */}
        <div className="md:hidden space-y-3">
          {items.map((it) => (
            <div key={it.service} className="card p-4">
              <div className="font-medium leading-snug">{it.service}</div>
              <div className="mt-3 grid grid-cols-1 gap-2">
                <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                  <span className="text-xs text-[var(--muted)]">
                    {docA || "Medic"}
                  </span>
                  <PriceCell value={it.a} currency={currency} />
                </div>
                <div className="flex items-center justify-between rounded-lg border bg-white px-3 py-2">
                  <span className="text-xs text-[var(--muted)]">
                    {docB || "Medic"}
                  </span>
                  <PriceCell value={it.b} currency={currency} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* DESKTOP: Table */}
        <div className="hidden md:block card p-4 md:p-6">
          <div className="overflow-x-auto">
            <table className="min-w-[860px] w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-3 pr-6">Serviciu</th>
                  <th className="py-3 pr-6 whitespace-nowrap">
                    {docA || "Medic"}
                  </th>
                  <th className="py-3 pr-6 whitespace-nowrap">
                    {docB || "Medic"}
                  </th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={it.service} className="border-b last:border-b-0">
                    <td className="py-3 pr-6 text-[var(--ink)]">
                      {it.service}
                    </td>
                    <td className="py-3 pr-6 whitespace-nowrap text-[var(--muted)]">
                      {typeof it.a === "number" ? `${it.a} ${currency}` : "—"}
                    </td>
                    <td className="py-3 pr-6 whitespace-nowrap text-[var(--muted)]">
                      {typeof it.b === "number" ? `${it.b} ${currency}` : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
            <CtaPhones />
          </div>
        </div>
      </section>
    </div>
  );
}
