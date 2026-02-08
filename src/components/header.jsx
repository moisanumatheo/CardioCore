// src/components/header.jsx
import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import logoUrl from "/CardioCoreLogo.png";

const navItems = [
  { to: "/", label: "Acasă", end: true },
  { to: "/servicii", label: "Servicii" },
  { to: "/preturi", label: "Prețuri" },
  { to: "/echipa", label: "Echipa" },
  { to: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // închide meniul când schimbi pagina
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // închide pe ESC
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const desktopLink = ({ isActive }) =>
    `px-4 py-3 rounded-md text-base transition-colors ${
      isActive
        ? "text-[var(--brand)]"
        : "text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  const mobileLink = ({ isActive }) =>
    `block w-full text-left px-4 py-3 text-based rounded-md transition ${
      isActive ? "bg-[var(--brand)]/10 text-[var(--brand)]" : "hover:bg-black/5"
    }`;

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:pl-32 md:pr-4 h-16 md:h-28 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3" aria-label="Acasă">
          <img
            src={logoUrl}
            alt="CardioCore"
            className="h-20 md:h-24 lg:h-28 w-auto object-contain select-none"
            loading="eager"
            decoding="async"
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-2 md:gap-3">
          {navItems.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              className={desktopLink}
            >
              {it.label}
            </NavLink>
          ))}
        </nav>

        {/* MOBILE: hamburger */}
        <div className="md:hidden">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm"
            aria-label={open ? "Închide meniul" : "Deschide meniul"}
            aria-expanded={open ? "true" : "false"}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {/* icon */}
            <svg
              viewBox="0 0 24 24"
              className="size-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              {open ? (
                <>
                  <path d="M18 6 6 18" />
                  <path d="M6 6l12 12" />
                </>
              ) : (
                <>
                  <path d="M4 6h16" />
                  <path d="M4 12h16" />
                  <path d="M4 18h16" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* MOBILE DROPDOWN + overlay */}
      {open && (
        <>
          {/* overlay (click = close) */}
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/20 md:hidden"
            aria-label="Închide meniul"
            onClick={() => setOpen(false)}
          />

          {/* dropdown */}
          <div
            id="mobile-menu"
            className="md:hidden relative z-50 border-t bg-white"
          >
            <div className="mx-auto max-w-7xl px-4 py-3">
              <div className="grid gap-1">
                {navItems.map((it) => (
                  <NavLink
                    key={it.to}
                    to={it.to}
                    end={it.end}
                    className={mobileLink}
                  >
                    {it.label}
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
