import { useEffect, useLayoutEffect, useRef, useState } from "react";

/**
 * Carousel pe pagini (1/2/3 carduri per view), dots dinamice.
 * Fără fundal/chenar pe spate, shadow complet pe carduri.
 */
export default function ReviewsCarousel({ items = [], interval = 0 }) {
  const trackRef = useRef(null);
  const slidesRef = useRef([]);
  const [perView, setPerView] = useState(1);
  const [itemW, setItemW] = useState(0); // px
  const [gap, setGap] = useState(16); // gap-4 = 16px
  const [page, setPage] = useState(0); // index pagină activă

  // măsurăm și setăm câte carduri pe view + lățimea exactă a cardului (fără „peek”)
  const measure = () => {
    const root = trackRef.current;
    if (!root) return;
    const w = root.clientWidth;

    const pv = w >= 1024 ? 3 : w >= 768 ? 2 : 1; // LG:3, MD:2, SM:1
    const g = 16; // trebuie să „bată” cu gap-ul din clasa de pe track
    const totalGap = g * (pv - 1);
    const widthPerCard = Math.floor((w - totalGap) / pv);

    setPerView(pv);
    setGap(g);
    setItemW(widthPerCard);

    // aplicăm width fix pe fiecare card pentru a umple exact view-ul
    slidesRef.current.forEach((el) => {
      if (el) el.style.width = `${widthPerCard}px`;
    });

    // repoziționează la începutul paginii curente după resize
    const p = page;
    requestAnimationFrame(() => {
      root.scrollTo({
        left: p * (widthPerCard * pv + totalGap),
        behavior: "auto",
      });
    });
  };

  useLayoutEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const pages = Math.max(1, Math.ceil(items.length / perView));

  // sincronizează pagina la scroll (rotunjim la cea mai apropiată pagină)
  const onScroll = () => {
    const root = trackRef.current;
    if (!root || !itemW) return;
    const pageWidth = perView * itemW + gap * (perView - 1);
    const p = Math.round(root.scrollLeft / pageWidth);
    setPage(Math.min(Math.max(p, 0), pages - 1));
  };

  // scroll la o pagină
  const goTo = (p) => {
    const root = trackRef.current;
    if (!root || !itemW) return;
    const clamped = Math.max(0, Math.min(p, pages - 1));
    const pageWidth = perView * itemW + gap * (perView - 1);
    root.scrollTo({ left: clamped * pageWidth, behavior: "smooth" });
  };

  const go = (dir) => goTo(page + dir);

  // autoplay pe pagini (oprește la interacțiune)
  useEffect(() => {
    if (!interval) return;
    const root = trackRef.current;
    if (!root) return;
    const id = setInterval(() => goTo((page + 1) % pages), interval);
    const stop = () => clearInterval(id);
    root.addEventListener("pointerdown", stop, { once: true });
    root.addEventListener("mouseenter", stop, { once: true });
    root.addEventListener("focusin", stop, { once: true });
    return () => clearInterval(id);
  }, [interval, page, pages]);

  if (!items.length) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Ce spun pacienții</h2>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => go(-1)}
            className="h-9 w-9 rounded-md border bg-white text-sm hover:bg-white/70"
            aria-label="Înapoi"
          >
            ‹
          </button>
          <button
            onClick={() => go(1)}
            className="h-9 w-9 rounded-md border bg-white text-sm hover:bg-white/70"
            aria-label="Înainte"
          >
            ›
          </button>
        </div>
      </div>

      {/* Track: */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="flex gap-4 overflow-x-auto overflow-y-visible snap-x snap-mandatory scroll-smooth
                   [-ms-overflow-style:none] [scrollbar-width:none] bg-transparent py-1"
        style={{ scrollPaddingInline: 0 }}
      >
        <style>{`div::-webkit-scrollbar{display:none}`}</style>

        {/* spacer mic la capete  */}
        <div aria-hidden className="shrink-0 w-0" />

        {items.map((q, i) => (
          <article
            key={i}
            ref={(el) => (slidesRef.current[i] = el)}
            className="
              snap-start shrink-0
              rounded-[var(--radius)]
              bg-white
              p-4
              ring-1 
              ring-[color:color-mix(in_srgb,var(--ink)_6%,transparent)] 
              shadow-none
            "
            aria-label={`Recenzie ${i + 1} din ${items.length}`}
          >
            <p className="text-sm text-[var(--muted)] leading-relaxed">“{q}”</p>
          </article>
        ))}

        <div aria-hidden className="shrink-0 w-0" />
      </div>

      {/* Dots dinamice */}
      <div className="mt-4 flex items-center justify-end gap-2">
        {Array.from({ length: pages }).map((_, i) => {
          const on = i === page;
          return (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2.5 rounded-full transition-all ${on ? "w-6 bg-[var(--brand)]" : "w-2.5 bg-gray-300"}`}
              aria-label={`Mergi la pagina ${i + 1}`}
              aria-current={on ? "true" : "false"}
            />
          );
        })}
      </div>

      {/* Săgeți pe mobil */}
      <div className="mt-3 md:hidden flex items-center justify-center gap-2">
        <button
          onClick={() => go(-1)}
          className="h-9 px-3 rounded-md border bg-white text-sm"
        >
          ‹ Înapoi
        </button>
        <button
          onClick={() => go(1)}
          className="h-9 px-3 rounded-md border bg-white text-sm"
        >
          Înainte ›
        </button>
      </div>
    </section>
  );
}
