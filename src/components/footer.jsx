import { SITE } from "../data/site";
import logoUrl from "/CardioCoreLogo.png";
export default function Footer() {
  const phoneLink = SITE.phone.replace(/\s+/g, "");

  return (
    <footer className="border-t bg-white mt-12">
      <div className="mx-auto max-w-7xl px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
        {/* Coloana 1 – Brand */}
        <div>
          <img
            src={logoUrl}
            alt="CardioCore"
            className="h-20 md:h-24 lg:h-24 w-auto object-contain select-none"
            loading="eager"
            decoding="async"
          />
        </div>

        {/* Coloana 2 – Contact */}
        <div>
          <div className="font-medium mb-2">Contact</div>
          <div className="space-y-1 text-[var(--muted)]">
            <div>
              <a href={`tel:${phoneLink}`} className="hover:underline">
                {SITE.phone}
              </a>
            </div>
            <div>
              <a href={`mailto:${SITE.email}`} className="hover:underline">
                {SITE.email}
              </a>
            </div>
          </div>
        </div>

        {/* Coloana 3 – Program & Locație */}
        <div>
          <div className="font-medium mb-2">Program</div>
          <div className="space-y-1 text-[var(--muted)]">
            {SITE.hours.map((h) => (
              <div key={h.days + h.time}>
                {h.days}: {h.time}
              </div>
            ))}
          </div>

          <div className="mt-4">
            <div className="font-medium mb-2">Locație</div>

            <div className="text-[var(--muted)] text-sm space-y-1.5 leading-snug">
              <div className="text-[var(--ink)] font-medium">
                {SITE.address.complex}
              </div>

              <div>{SITE.address.line1}</div>
              <div>{SITE.address.line2}</div>
            </div>

            <a
              href={SITE.address.mapsUrl}
              target="_blank"
              rel="noopener"
              className="mt-2 inline-flex items-center gap-2 text-[var(--brand)] hover:underline text-sm"
            >
              <span aria-hidden="true">📍</span>
              Vezi locația pe Google Maps
            </a>
          </div>
        </div>

        {/* Coloana 4 – Social */}
        <div>
          <div className="font-medium mb-2">Social media</div>
          <div className="flex flex-col gap-1">
            {SITE.social?.facebook && (
              <a
                href={SITE.social.facebook}
                target="_blank"
                rel="noopener"
                className="text-[var(--brand)] hover:underline"
              >
                Facebook
              </a>
            )}
            {SITE.social?.instagram && (
              <a
                href={SITE.social.instagram}
                target="_blank"
                rel="noopener"
                className="text-[var(--brand)] hover:underline"
              >
                Instagram
              </a>
            )}
            {SITE.social?.tiktok && (
              <a
                href={SITE.social.tiktok}
                target="_blank"
                rel="noopener"
                className="text-[var(--brand)] hover:underline"
              >
                TikTok
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Bară jos */}
      <div className="border-t">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-[var(--muted)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            © {new Date().getFullYear()} {SITE.name}. Toate drepturile
            rezervate.
          </span>
          <a href="/contact" className="hover:underline">
            Contact & Programări
          </a>
        </div>
      </div>
    </footer>
  );
}
