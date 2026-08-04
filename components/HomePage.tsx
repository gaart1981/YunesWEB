import Link from "next/link";
import type { HomeContent, Locale } from "@/lib/home-content";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "العربية"
};

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function HomePage({
  locale,
  content
}: {
  locale: Locale;
  content: HomeContent;
}) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        {content.navigation.services}
      </a>

      <header className="site-header">
        <div className="header-inner">
          <Link href={`/${locale}/`} className="brand" aria-label="Salimi Engineering">
            <strong>SALIMI</strong>
            <span>ENGINEERING</span>
          </Link>

          <nav className="desktop-nav" aria-label={content.navigation.language}>
            <a href="#services">{content.navigation.services}</a>
            <a href="#approach">{content.navigation.approach}</a>
            <a href="#founder">{content.navigation.founder}</a>
            <a href="#contact">{content.navigation.contact}</a>
          </nav>

          <div className="header-actions">
            <div className="language-switcher" aria-label={content.navigation.language}>
              {(["en", "fr", "ar"] as Locale[]).map((item) => (
                <Link
                  key={item}
                  href={`/${item}/`}
                  lang={item}
                  hrefLang={item}
                  aria-current={item === locale ? "page" : undefined}
                >
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
            <a className="button button--small" href="#contact">
              {content.navigation.cta}
            </a>
          </div>

          <details className="mobile-menu">
            <summary aria-label={content.navigation.services}>
              <span />
              <span />
            </summary>
            <nav>
              <a href="#services">{content.navigation.services}</a>
              <a href="#approach">{content.navigation.approach}</a>
              <a href="#founder">{content.navigation.founder}</a>
              <a href="#contact">{content.navigation.contact}</a>
              <div className="language-switcher language-switcher--mobile">
                {(["en", "fr", "ar"] as Locale[]).map((item) => (
                  <Link key={item} href={`/${item}/`} lang={item} hrefLang={item}>
                    {localeLabels[item]}
                  </Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--sand">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div className="hero-actions">
                <a className="button button--sand" href="#contact">
                  {content.hero.primaryCta}
                  <Arrow />
                </a>
                <a className="text-link text-link--light" href="#services">
                  {content.hero.secondaryCta}
                  <Arrow />
                </a>
              </div>
              <p className="trust-note">{content.hero.trust}</p>
            </div>

            <div className="hero-media">
              <img
                src="/images/placeholders/hero-engineering-16x10.svg"
                alt=""
                width="1600"
                height="1000"
              />
            </div>
          </div>
          <div className="datum" aria-hidden="true">
            <span>33.5731° N</span>
            <span>7.5898° W</span>
            <span>MOROCCO</span>
          </div>
        </section>

        <section className="audience-section">
          <div className="container audience-grid">
            {content.audiences.map((audience, index) => (
              <div key={audience} className="audience-item">
                <span>0{index + 1}</span>
                <p>{audience}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="services" className="section section--light">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div>
                <p className="eyebrow">{content.services.eyebrow}</p>
                <h2>{content.services.title}</h2>
              </div>
              <p>{content.services.summary}</p>
            </div>

            <div className="service-grid">
              {content.services.items.map((service) => (
                <article key={service.number} className="service-card">
                  <div className="card-index">
                    <span>{service.number}</span>
                    <i />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="section section--dark">
          <div className="container">
            <div className="section-heading section-heading--split section-heading--inverse">
              <div>
                <p className="eyebrow eyebrow--sand">{content.approach.eyebrow}</p>
                <h2>{content.approach.title}</h2>
              </div>
            </div>

            <div className="approach-grid">
              {content.approach.items.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="section section--founder">
          <div className="container founder-grid">
            <div className="founder-media">
              <img
                src="/images/placeholders/founder-portrait-4x5.svg"
                alt=""
                width="960"
                height="1200"
              />
            </div>
            <div className="founder-copy">
              <p className="eyebrow">{content.founder.eyebrow}</p>
              <h2>{content.founder.title}</h2>
              <p>{content.founder.text}</p>
              <blockquote>{content.founder.quote}</blockquote>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <p className="eyebrow eyebrow--sand">{content.contact.eyebrow}</p>
              <h2>{content.contact.title}</h2>
            </div>
            <div>
              <p>{content.contact.text}</p>
              <span className="button button--sand button--disabled">
                {content.contact.button}
              </span>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <div className="brand brand--footer">
              <strong>SALIMI</strong>
              <span>ENGINEERING</span>
            </div>
            <p>{content.footer.descriptor}</p>
          </div>
          <p className="footer-status">{content.footer.status}</p>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Salimi Engineering</span>
          <span>{content.footer.rights}</span>
        </div>
      </footer>
    </>
  );
}
