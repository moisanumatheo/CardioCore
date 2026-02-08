export default function EKGCard({
  animated = true,
  respectReducedMotion = false,
}) {
  return (
    <div
      className={`rounded-[var(--radius)] bg-white border shadow overflow-hidden ${
        respectReducedMotion ? "respect-reduce" : ""
      }`}
    >
      <svg
        viewBox="0 0 800 480"
        className="w-full h-full block"
        role="img"
        aria-label="Electrocardiogramă"
      >
        <defs>
          {/* grid (culori din temă) */}
          <pattern
            id="smallGrid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 20 0 L 0 0 0 20"
              fill="none"
              /* linii foarte discrete pe baza culorilor site-ului */
              stroke="color-mix(in srgb, var(--ink) 8%, transparent)"
              strokeWidth="1"
            />
          </pattern>
          <pattern
            id="bigGrid"
            width="100"
            height="100"
            patternUnits="userSpaceOnUse"
          >
            <rect width="100" height="100" fill="url(#smallGrid)" />
            <path
              d="M 100 0 L 0 0 0 100"
              fill="none"
              stroke="color-mix(in srgb, var(--ink) 14%, transparent)"
              strokeWidth="1.25"
            />
          </pattern>

          {/* colțuri rotunjite */}
          <clipPath id="radiusClip">
            <rect x="0" y="0" width="800" height="480" rx="24" ry="24" />
          </clipPath>

          {/* glow pe traseu */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* bg + grid (folosește exact fundalul site-ului) */}
        <g clipPath="url(#radiusClip)">
          <rect width="800" height="480" fill="var(--bg)" />
          <rect width="800" height="480" fill="url(#bigGrid)" />
        </g>

        {/* linia de bază discretă */}
        <line
          x1="0"
          x2="800"
          y1="260"
          y2="260"
          stroke="color-mix(in srgb, var(--ink) 18%, transparent)"
          strokeDasharray="4 8"
        />

        {/* traseul EKG – monocrom roșu */}
        <g filter="url(#glow)">
          <path
            d="
            M 0 260
            L 40 260 55 252 65 266 75 260 110 260
            120 252 130 280 135 290 142 220 150 310 160 248 170 260 210 260
            225 255 240 265 260 260 280 260 295 252 305 266 315 260 350 260
            360 252 370 280 375 290 382 220 390 310 400 248 410 260 450 260

            L 490 260 505 252 515 266 525 260 560 260
            570 252 580 280 585 290 592 220 600 310 610 248 620 260 660 260
            675 255 690 265 710 260 730 260 745 252 755 266 765 260 800 260"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={animated ? "ekg-anim" : undefined}
          />
        </g>

        {/* keyframes inline */}
        <style>{`
          .ekg-anim {
            stroke-dasharray: 1650;
            stroke-dashoffset: 1650;
            animation: ekg-draw 6s linear infinite;
          }
          @keyframes ekg-draw { to { stroke-dashoffset: 0; } }

          /* Respectă Reduce Motion doar dacă vrei explicit */
          @media (prefers-reduced-motion: reduce) {
            .respect-reduce .ekg-anim { animation: none !important; }
          }
        `}</style>
      </svg>
    </div>
  );
}
