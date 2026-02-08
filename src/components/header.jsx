// src/components/header.jsx
import { Link, NavLink } from "react-router-dom";
import logoUrl from "/CardioCoreLogo.png";

export default function Header() {
  const link = ({ isActive }) =>
    `px-6 py-3 md:px-8 md:py-4 rounded-lg text-base md:text-lg font-medium transition-colors ${
      isActive
        ? "text-[var(--brand)]"
        : "text-[var(--muted)] hover:text-[var(--ink)]"
    }`;

  return (
    <header className="border-b bg-white">
      <div className="mx-auto max-w-7xl pl-6 md:pl-32 pr-4 h-16 md:h-28 flex items-center justify-between">
        <Link to="/" className="flex items-center" aria-label="Acasă">
          <img
            src={logoUrl}
            alt="CardioCare"
            className="h-16 md:h-20 lg:h-24 w-auto object-contain select-none"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="flex gap-2 md:gap-3">
          <NavLink to="/" end className={link}>
            Acasă
          </NavLink>
          <NavLink to="/servicii" className={link}>
            Servicii
          </NavLink>
          <NavLink to="/preturi" className={link}>
            Prețuri
          </NavLink>
          <NavLink to="/echipa" className={link}>
            Echipa
          </NavLink>
          <NavLink to="/contact" className={link}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
