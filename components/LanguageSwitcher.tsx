import Link from "next/link";
import type { Locale } from "@/lib/home-content";
import { locales } from "@/lib/home-content";

/**
 * Language names written in their own language and script — autonyms.
 *
 * A visitor who reads only Arabic cannot find "Arabic"; they can find
 * العربية. This is the one label that must never be translated.
 *
 * No flags. A flag is a country, not a language, and every choice here would
 * be wrong for someone: French is the working language of Morocco, Belgium,
 * Switzerland and Canada as well as France; Arabic spans twenty-odd states,
 * so any single flag excludes most of its readers. For a Moroccan bureau
 * selling to international clients that misfires in both directions. The
 * two-letter code carries the same at-a-glance function without the claim.
 */
const AUTONYMS: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  ar: "العربية",
  ru: "Русский",
  de: "Deutsch",
  es: "Español"
};

const CODES: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "AR",
  ru: "RU",
  de: "DE",
  es: "ES"
};

function Globe() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <circle cx="8" cy="8" r="6.4" />
      <path d="M1.6 8h12.8M8 1.6c1.7 1.8 2.6 4 2.6 6.4S9.7 12.6 8 14.4C6.3 12.6 5.4 10.4 5.4 8S6.3 3.4 8 1.6Z" />
    </svg>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true" className="lang-chevron">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

/**
 * Built on <details> rather than a scripted menu: it opens, closes and takes
 * keyboard focus natively, so it works before hydration and without any
 * JavaScript at all — which matters on a statically exported site.
 *
 * `path` keeps the visitor on the page they are reading when they switch,
 * rather than dropping them on the homepage.
 */
export function LanguageSwitcher({
  locale,
  label,
  path = "/",
  variant = "menu"
}: {
  locale: Locale;
  label: string;
  path?: string;
  variant?: "menu" | "inline";
}) {
  if (variant === "inline") {
    return (
      <div className="language-switcher language-switcher--mobile" aria-label={label}>
        {locales.map((item) => (
          <Link
            key={item}
            href={`/${item}${path}`}
            lang={item}
            hrefLang={item}
            aria-current={item === locale ? "true" : undefined}
          >
            {AUTONYMS[item]}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <details className="lang-menu language-switcher">
      <summary aria-label={`${label}: ${AUTONYMS[locale]}`}>
        <Globe />
        <span aria-hidden="true">{CODES[locale]}</span>
        <Chevron />
      </summary>
      <div className="lang-menu__list" role="group" aria-label={label}>
        {locales.map((item) => (
          <Link
            key={item}
            href={`/${item}${path}`}
            lang={item}
            hrefLang={item}
            aria-current={item === locale ? "true" : undefined}
          >
            <span className="lang-menu__code" aria-hidden="true">{CODES[item]}</span>
            <span className="lang-menu__name">{AUTONYMS[item]}</span>
          </Link>
        ))}
      </div>
    </details>
  );
}
