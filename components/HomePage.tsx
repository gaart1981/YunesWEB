import Link from "next/link";
import type { HomeContent, Locale } from "@/lib/home-content";
import { getSiteContent } from "@/lib/site-content";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "العربية"
};

const serviceSlugs = [
  "owners-engineering-amo",
  "electrical-mep-engineering",
  "local-engineering-partner-morocco"
] as const;

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

export function HomePage({ locale, content }: { locale: Locale; content: HomeContent }) {
  const site = getSiteContent(locale);
  const nav = site.navigation;
  const phoneHref = `tel:${nav.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${nav.phone.replace(/[^\d]/g, "")}`;

  return (
    <>
      <a className="skip-link" href="#main-content">{nav.skip}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link href={`/${locale}/`} className="brand" aria-label="Salimi Engineering">
            <strong>SALIMI</strong>
            <span>ENGINEERING</span>
          </Link>
          <nav className="desktop-nav" aria-label={nav.language}>
            <Link href={`/${locale}/services`}>{nav.services}</Link>
            <Link href={`/${locale}/sectors`}>{nav.sectors}</Link>
            <Link href={`/${locale}/experience`}>{nav.experience}</Link>
            <Link href={`/${locale}/about`}>{nav.about}</Link>
          </nav>
          <div className="header-actions">
            <div className="language-switcher" aria-label={nav.language}>
              {(["en", "fr", "ar"] as Locale[]).map((item) => (
                <Link key={item} href={`/${item}/`} lang={item} hrefLang={item} aria-current={item === locale ? "page" : undefined}>
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
            <a className="button button--small" href={phoneHref}>{nav.cta}</a>
          </div>
          <details className="mobile-menu">
            <summary aria-label={nav.services}><span /><span /></summary>
            <nav>
              <Link href={`/${locale}/services`}>{nav.services}</Link>
              <Link href={`/${locale}/sectors`}>{nav.sectors}</Link>
              <Link href={`/${locale}/experience`}>{nav.experience}</Link>
              <Link href={`/${locale}/about`}>{nav.about}</Link>
              <Link href={`/${locale}/contact`}>{nav.contact}</Link>
              <a href={phoneHref}>{nav.cta}</a>
              <div className="language-switcher language-switcher--mobile">
                {(["en", "fr", "ar"] as Locale[]).map((item) => (
                  <Link key={item} href={`/${item}/`} lang={item} hrefLang={item}>{localeLabels[item]}</Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero hero--conversion">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--sand">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div className="hero-actions hero-actions--conversion">
                <a className="button button--sand" href={phoneHref}>
                  {content.hero.primaryCta}<Arrow />
                </a>
                <a className="button button--outline-light" href={whatsappHref} target="_blank" rel="noreferrer">
                  {content.hero.whatsappCta}<Arrow />
                </a>
                <Link className="text-link text-link--light" href={`/${locale}/services`}>
                  {content.hero.secondaryCta}<Arrow />
                </Link>
              </div>
              <p className="trust-note trust-note--strong">{content.hero.trust}</p>
            </div>
            <div className="hero-media">
              <img src="/images/generated/industrial-facility-exterior.svg" alt="" width="560" height="700" />
            </div>
          </div>
          <div className="datum" aria-hidden="true"><span>DESIGN</span><span>SUPERVISION</span><span>MOROCCO</span></div>
        </section>

        <section className="audience-section audience-section--problems">
          <div className="container audience-grid">
            {content.audiences.map((audience, index) => (
              <div key={audience} className="audience-item"><span>0{index + 1}</span><p>{audience}</p></div>
            ))}
          </div>
        </section>

        <section id="services" className="section section--light">
          <div className="container">
            <div className="section-heading section-heading--split">
              <div><p className="eyebrow">{content.services.eyebrow}</p><h2>{content.services.title}</h2></div>
              <p>{content.services.summary}</p>
            </div>
            <div className="service-grid">
              {content.services.items.map((service, index) => (
                <Link key={service.number} className="service-card" href={`/${locale}/${serviceSlugs[index]}`}>
                  <div className="card-index"><span>{service.number}</span><i /></div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <span className="card-link">{nav.services}<Arrow /></span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="approach" className="section section--dark">
          <div className="container">
            <div className="section-heading section-heading--split section-heading--inverse">
              <div><p className="eyebrow eyebrow--sand">{content.approach.eyebrow}</p><h2>{content.approach.title}</h2></div>
            </div>
            <div className="approach-grid">
              {content.approach.items.map((item, index) => (
                <article key={item.title}><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></article>
              ))}
            </div>
          </div>
        </section>

        <section id="founder" className="section section--founder">
          <div className="container founder-grid">
            <div className="founder-media"><img src="/images/generated/yunes-salimi-portrait.svg" alt="" width="560" height="700" /></div>
            <div className="founder-copy">
              <p className="eyebrow">{content.founder.eyebrow}</p>
              <h2>{content.founder.title}</h2>
              <p>{content.founder.text}</p>
              <blockquote>{content.founder.quote}</blockquote>
              <div className="founder-actions">
                <a className="button" href={phoneHref}>{content.hero.primaryCta}<Arrow /></a>
                <Link className="text-link" href={`/${locale}/about`}>{nav.about}<Arrow /></Link>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div><p className="eyebrow eyebrow--sand">{content.contact.eyebrow}</p><h2>{content.contact.title}</h2></div>
            <div>
              <p>{content.contact.text}</p>
              <div className="hero-actions">
                <Link className="button button--sand" href={`/${locale}/contact`}>{content.contact.button}<Arrow /></Link>
                <a className="text-link text-link--light" href={whatsappHref} target="_blank" rel="noreferrer">{content.hero.whatsappCta}<Arrow /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-expanded">
          <div><div className="brand brand--footer"><strong>SALIMI</strong><span>ENGINEERING</span></div><p>{nav.footerDescriptor}</p></div>
          <div className="footer-contact"><span>{nav.address}</span><a href={`mailto:${nav.email}`}>{nav.email}</a><a href={phoneHref}>{nav.phone}</a></div>
          <nav className="footer-links"><Link href={`/${locale}/legal-notice`}>{nav.legal}</Link><Link href={`/${locale}/privacy-policy`}>{nav.privacy}</Link><Link href={`/${locale}/cookie-policy`}>{nav.cookies}</Link></nav>
        </div>
        <div className="container footer-preview-note">{nav.footerStatus}</div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Salimi Engineering</span><span>Morocco · Engineering & Project Delivery</span></div>
      </footer>
    </>
  );
}
