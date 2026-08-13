import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import type { HomeContent, Locale } from "@/lib/home-content";
import { locales } from "@/lib/home-content";
import { getPageContent, getSiteContent } from "@/lib/site-content";

const localeLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  ar: "العربية",
  ru: "RU"
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
  const experiencePage = getPageContent(locale, "experience");
  const sectorsPage = getPageContent(locale, "sectors");
  // Three projects spanning different environments: corporate, banking/technical, industrial.
  const featuredProjects = (experiencePage.projects ?? []).filter((_, i) => [0, 4, 5].includes(i));
  const previewSectors = (sectorsPage.items ?? []).slice(0, 5);
  const nav = site.navigation;
  const phoneHref = `tel:${nav.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${nav.phone.replace(/[^\d]/g, "")}`;

  return (
    <>
      <a className="skip-link" href="#main-content">{nav.skip}</a>
      <header className="site-header">
        <div className="header-inner">
          <Link href={`/${locale}/`} className="brand" aria-label={`${nav.home} — Salimi Engineering`}>
            <BrandLogo variant="primary" tone="white" className="brand-logo brand-logo--header" />
          </Link>
          <nav className="desktop-nav" aria-label={nav.language}>
            <Link href={`/${locale}/services`}>{nav.services}</Link>
            <Link href={`/${locale}/sectors`}>{nav.sectors}</Link>
            <Link href={`/${locale}/experience`}>{nav.experience}</Link>
            <Link href={`/${locale}/about`}>{nav.about}</Link>
            <Link href={`/${locale}/contact`}>{nav.contact}</Link>
          </nav>
          <div className="header-actions">
            <div className="language-switcher" aria-label={nav.language}>
              {locales.map((item) => (
                <Link key={item} href={`/${item}/`} lang={item} hrefLang={item} aria-current={item === locale ? "page" : undefined}>
                  {localeLabels[item]}
                </Link>
              ))}
            </div>
            <Link className="button button--small" href={`/${locale}/contact`}>{nav.cta}</Link>
          </div>
          <details className="mobile-menu">
            <summary aria-label={nav.services}><span /><span /></summary>
            <nav>
              <Link href={`/${locale}/services`}>{nav.services}</Link>
              <Link href={`/${locale}/sectors`}>{nav.sectors}</Link>
              <Link href={`/${locale}/experience`}>{nav.experience}</Link>
              <Link href={`/${locale}/about`}>{nav.about}</Link>
              <Link href={`/${locale}/contact`}>{nav.contact}</Link>
              <Link href={`/${locale}/contact`}>{nav.cta}</Link>
              <div className="language-switcher language-switcher--mobile">
                {locales.map((item) => (
                  <Link key={item} href={`/${item}/`} lang={item} hrefLang={item}>{localeLabels[item]}</Link>
                ))}
              </div>
            </nav>
          </details>
        </div>
      </header>

      <main id="main-content">
        <section className="hero hero--compact">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow eyebrow--sand">{content.hero.eyebrow}</p>
              <h1>{content.hero.title}</h1>
              <p className="hero-summary">{content.hero.summary}</p>
              <div className="hero-actions">
                <Link className="button button--sand" href={`/${locale}/contact`}>
                  {content.hero.primaryCta}<Arrow />
                </Link>
                <Link className="button button--outline-light" href={`/${locale}/services`}>
                  {content.hero.secondaryCta}<Arrow />
                </Link>
              </div>
              <p className="trust-note">{content.hero.trust}</p>
            </div>
            <div className="hero-media">
              <img src="/images/generated/industrial-facility-exterior.svg" alt="" width="560" height="620" />
            </div>
          </div>
        </section>

        <section className="credibility-strip">
          <div className="container credibility-grid">
            {content.credibility.items.map((item) => (
              <div key={item.title} className="credibility-item">
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
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

        <section id="experience" className="section section--light section--tight">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{content.experiencePreview.eyebrow}</p>
              <h2>{content.experiencePreview.title}</h2>
              <p className="attribution-note">{content.experiencePreview.disclosure}</p>
            </div>
            <ul className="evidence-rows">
              {featuredProjects.map((project) => (
                <li key={project.title} className="evidence-row">
                  <div className="evidence-row__head">
                    <h3>{project.title}</h3>
                    <p className="evidence-meta">
                      <span>{project.sector}</span>
                      <span>{project.location}</span>
                    </p>
                  </div>
                  <p className="evidence-scope">{project.scope}</p>
                  <p className="evidence-role">{project.role}</p>
                </li>
              ))}
            </ul>
            <Link className="text-link" href={`/${locale}/experience`}>
              {content.experiencePreview.cta}<Arrow />
            </Link>
          </div>
        </section>

        <section id="delivery" className="section section--dark section--tight">
          <div className="container delivery-grid">
            <div className="delivery-copy">
              <p className="eyebrow eyebrow--sand">{content.delivery.eyebrow}</p>
              <h2>{content.delivery.title}</h2>
              <p>{content.delivery.text}</p>
              <ol className="delivery-chain" aria-label={content.delivery.title}>
                {content.delivery.chain.map((node) => (
                  <li key={node}>{node}</li>
                ))}
              </ol>
            </div>
            <ol className="delivery-steps">
              {content.delivery.steps.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="sectors" className="section section--light section--tight">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">{content.sectorsPreview.eyebrow}</p>
              <h2>{content.sectorsPreview.title}</h2>
            </div>
            <ul className="sector-matrix">
              {previewSectors.map((sector) => (
                <li key={sector.title}>
                  <h3>{sector.title}</h3>
                  <p>{sector.text}</p>
                </li>
              ))}
            </ul>
            <Link className="text-link" href={`/${locale}/sectors`}>
              {content.sectorsPreview.cta}<Arrow />
            </Link>
          </div>
        </section>

        <section id="founder" className="section section--founder">
          <div className="container founder-grid">
            <div className="founder-media"><img src="/images/people/younes-salimi-home.webp" alt={content.founder.imageAlt} width="560" height="700" /></div>
            <div className="founder-copy">
              <p className="eyebrow">{content.founder.eyebrow}</p>
              <h2>{content.founder.title}</h2>
              <p>{content.founder.text}</p>
              <blockquote>{content.founder.quote}</blockquote>
              <div className="founder-actions">
                <Link className="button" href={`/${locale}/contact`}>{content.hero.primaryCta}<Arrow /></Link>
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
          <div><Link href={`/${locale}/`} className="footer-brand-link" aria-label={`${nav.home} — Salimi Engineering`}><BrandLogo variant="primary" tone="white" className="brand-logo brand-logo--footer" /></Link><p>{nav.footerDescriptor}</p></div>
          <div className="footer-contact"><span>{nav.address}</span><a href={`mailto:${nav.email}`}>{nav.email}</a><a href={phoneHref}>{nav.phone}</a></div>
          <nav className="footer-links"><Link href={`/${locale}/legal-notice`}>{nav.legal}</Link><Link href={`/${locale}/privacy-policy`}>{nav.privacy}</Link><Link href={`/${locale}/cookie-policy`}>{nav.cookies}</Link></nav>
        </div>
        <div className="container footer-preview-note">{nav.footerStatus}</div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Salimi Engineering</span><span>Morocco · Engineering & Project Delivery</span></div>
      </footer>
    </>
  );
}
