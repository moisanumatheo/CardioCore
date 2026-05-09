// src/components/CtaPhones.jsx
import { SITE } from "../data/site";

export default function CtaPhones() {
  const phones = SITE.phones ?? [];

  return (
    <div className="flex flex-col gap-2">
      {phones.map((p) => (
        <a
          key={p.number}
          href={`tel:${p.number.replace(/\s+/g, "")}`}
          className="btn-white flex-col gap-0 items-center"
        >
          <span className="text-[11px] font-medium opacity-60 leading-none">
            {p.doctor}
          </span>
          <span className="mt-0.5">{p.number}</span>
        </a>
      ))}
    </div>
  );
}
