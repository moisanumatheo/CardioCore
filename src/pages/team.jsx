// src/pages/team.jsx
import { useMemo, useState } from "react";
import { TEAM, SITE } from "../data/site";
import Seo from "../components/Seo.jsx";

const SPECIALTIES = [
  "Toate",
  ...Array.from(new Set((TEAM || []).map((d) => d.specialty).filter(Boolean))),
];

/* Avatar cu initiale */
function Avatar({ name }) {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((s) => s[0])
    .slice(-2)
    .join("")
    .toUpperCase();

  return (
    <div
      className="size-12 shrink-0 rounded-full grid place-items-center
                 bg-[var(--brand)] text-white font-semibold tracking-wide
                 ring-4 ring-[var(--brand)]/15"
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

export default function Team() {
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("Toate");

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return (TEAM || []).filter((d) => {
      const tags = d.tags ?? [];
      const matchesText =
        !term ||
        d.name.toLowerCase().includes(term) ||
        (d.title?.toLowerCase() ?? "").includes(term) ||
        (d.bio?.toLowerCase() ?? "").includes(term) ||
        (d.specialty?.toLowerCase() ?? "").includes(term) ||
        tags.some((t) => (t || "").toLowerCase().includes(term));
      const matchesSpec = filter === "Toate" || d.specialty === filter;
      return matchesText && matchesSpec;
    });
  }, [q, filter]);

  return (
    <div className="bg-[var(--bg)] text-[var(--ink)]">
      <Seo
        title="CardioCore"
        description="Echipa medicală CardioCore este formată din medici cardiologi empatici, cu formare continuă și competențe variate."
      />

      {/* HERO */}
      <section className="mx-auto max-w-7xl px-4 pt-12 pb-6">
        <h1 className="text-3xl md:text-4xl font-bold">
          Echipa <span className="text-[var(--brand)]">Medicală</span>
        </h1>
        <p className="mt-3 text-[15px] text-[var(--muted)] max-w-prose">
          Medici empatici, cu formare continuă și competențe variate, gata să
          ofere îngrijire cardiologică modernă.
        </p>
      </section>

      {/* FILTRE + SEARCH */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center gap-4">
          <div className="flex flex-wrap gap-2 md:col-span-7">
            {SPECIALTIES.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-sm border transition
                  ${
                    filter === s
                      ? "text-white bg-[var(--brand)] border-transparent"
                      : "bg-white hover:bg-white/60"
                  }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="relative md:col-span-5 md:justify-self-end">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Caută medic, competențe…"
              className="w-80 md:w-96 max-w-full rounded-md border bg-white px-3 py-2 pr-9
                         outline-none focus:ring-2 ring-[var(--brand)]"
            />
            <svg
              className="absolute right-2 top-2.5 size-5 text-[var(--muted)] pointer-events-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
        </div>
      </section>

      {/* GRID DOCTORI */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
          {filtered.map((d) => (
            <article
              key={d.id ?? d.name}
              className="h-full min-h-[320px] flex flex-col rounded-3xl bg-white
                         border border-black/10 p-6
                         shadow-[0_1px_0_rgba(0,0,0,0.04)]
                         hover:shadow-md transition"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <Avatar name={d.name} />
                <div className="min-w-0">
                  <div className="font-semibold leading-tight text-[15px]">
                    {d.name}
                  </div>
                  {d.title && (
                    <div className="mt-0.5 text-sm text-[var(--muted)]">
                      {d.title}
                    </div>
                  )}
                  {d.specialty && (
                    <div className="mt-1 text-xs font-medium text-[var(--brand)]">
                      {d.specialty}
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="mt-4 flex-1">
                {d.bio && (
                  <p className="text-sm leading-relaxed text-[var(--ink)]/75">
                    {d.bio}
                  </p>
                )}

                {(d.tags?.length ?? 0) > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {d.tags.slice(0, 4).map((t) => (
                      <li
                        key={t}
                        className="text-xs px-2.5 py-1 rounded-lg border
                                   bg-[var(--brand)]/5 border-[var(--brand)]/20
                                   text-[var(--brand)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-black/10 flex items-center justify-between">
                <a
                  href="/contact"
                  className="text-sm font-medium text-[var(--brand)] hover:underline"
                >
                  Programează-te →
                </a>

                <div className="text-xs text-[var(--brand)] flex items-center gap-2">
                  {d.phone && (
                    <a
                      href={`tel:${d.phone.replace(/\s+/g, "")}`}
                      className="hover:underline"
                    >
                      {d.phone}
                    </a>
                  )}
                  {d.phone && d.email && (
                    <span className="text-black/20">·</span>
                  )}
                  {d.email && (
                    <a href={`mailto:${d.email}`} className="hover:underline">
                      Email
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-8 rounded-xl bg-white border p-6 text-center text-[var(--muted)]">
            Niciun rezultat pentru criteriile alese.
            <a
              href="/contact"
              className="ml-2 text-[var(--brand)] hover:underline"
            >
              Scrie-ne direct →
            </a>
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div
          className="bg-[var(--brand)] text-white rounded-2xl px-6 py-5
                        flex flex-col md:flex-row items-center justify-between gap-4
                        ring-1 ring-white/10"
        >
          <div className="text-base font-medium">
            Descoperă echipa noastră de specialiști dedicați.
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
    </div>
  );
}
