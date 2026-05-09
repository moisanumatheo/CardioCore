import { useEffect } from "react";

/** Creează sau actualizează un <meta> tag în <head>. */
function upsertMeta(attrName, attrValue, content) {
  if (!content) return;
  let el = document.querySelector(`meta[${attrName}="${attrValue}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Creează sau actualizează <link rel="canonical">. */
function upsertCanonical(href) {
  if (!href) return;
  let el = document.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

/**
 * Componentă SEO fără render vizual.
 *
 * Props:
 *  - title       : titlul paginii (document.title)
 *  - description : meta description (max ~160 caractere)
 *  - canonical   : URL canonic absolut (ex: "https://cardiocore.ro/servicii")
 *  - jsonLd      : obiect JSON-LD Schema.org pentru date structurate
 */
export default function Seo({ title, description, canonical, jsonLd }) {
  useEffect(() => {
    // Titlu pagină
    if (title) document.title = title;

    // Meta description
    upsertMeta("name", "description", description);

    // Open Graph (rețele sociale, WhatsApp, Messenger)
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    if (canonical) upsertMeta("property", "og:url", canonical);

    // Twitter Card
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);

    // URL canonic
    upsertCanonical(canonical);

    // Date structurate JSON-LD (Schema.org)
    const SCRIPT_ID = "__seo_jsonld__";
    let script = document.getElementById(SCRIPT_ID);
    if (jsonLd) {
      if (!script) {
        script = document.createElement("script");
        script.id = SCRIPT_ID;
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(jsonLd);
    } else if (script) {
      script.remove();
    }
  }, [title, description, canonical, jsonLd]);

  return null;
}
