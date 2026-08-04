import Link from "next/link";
import type { Locale } from "@/lib/home-content";
import type { SiteContent, SitePage, SiteSlug } from "@/lib/site-content";

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

function destination(locale: Locale, href: string) {
  if (href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) {
    return href;
  }
  return `/${locale}/${href}`;
}

function Header({ locale, slug, site }: { locale: Locale; slug: SiteSlug; site: SiteContent }) {
  const nav = site.navigation;
  const links = [
    ["services", nav.services],
    ["sectors", nav.sectors],
    ["experience", nav.experience],
    ["about", nav.about]
  ] as const;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}/`} className="brand" aria-label="Salimi Engineering">
          <strong>SALIMI</strong>
          <span>ENGINEERING</span>
        </Link>
        <nav className="desktop-nav" aria-label={nav.language}>
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`} aria-current={slug === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language-switcher" aria-label={nav.language}>
            {(["en", "fr", "ar"] as Locale[]).map((item) => (
              <Link key={item} href={`/${item}/${slug}`} lang={item} hrefLang={item} aria-current={item === locale ? "page" : undefined}>
                {localeLabels[item]}
              </Link>
            ))}
          </div>
          <Link className="button button--small" href={`/${locale}/contact`}>
            {nav.cta}
          </Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label={nav.services}>
            <span />
            <span />
          </summary>
          <nav>
            <Link href={`/${locale}/`}>{nav.home}</Link>
            {links.map(([href, label]) => (
              <Link key={href} href={`/${locale}/${href}`}>{label}</Link>
            ))}
            <Link href={`/${locale}/contact`}>{nav.contact}</Link>
            <div className="language-switcher language-switcher--mobile">
              {(["en", "fr", "ar"] as Locale[]).map((item) => (
                <Link key={item} href={`/${item}/${slug}`} lang={item} hrefLang={item}>{localeLabels[item]}</Link>
              ))}
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer({ locale, site }: { locale: Locale; site: SiteContent }) {
  const nav = site.navigation;
  return (
    <footer className="site-footer">
      <div className="container footer-expanded">
        <div>
          <div className="brand brand--footer">
            <strong>SALIMI</strong>
            <span>ENGINEERING</span>
          </div>
          <p>{nav.footerDescriptor}</p>
        </div>
        <div className="footer-contact">
          <span>{nav.address}</span>
          <a href={`mailto:${nav.email}`}>{nav.email}</a>
          <a href={`tel:${nav.phone.replace(/\s/g, "")}`}>{nav.phone}</a>
        </div>
        <nav className="footer-links">
          <Link href={`/${locale}/legal-notice`}>{nav.legal}</Link>
          <Link href={`/${locale}/privacy-policy`}>{nav.privacy}</Link>
          <Link href={`/${locale}/cookie-policy`}>{nav.cookies}</Link>
        </nav>
      </div>
      <div className="container footer-preview-note">{nav.footerStatus}</div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} Salimi Engineering</span>
        <span>Morocco · Engineering & Project Advisory</span>
      </div>
    </footer>
  );
}

export function ContentPage({ locale, page, site }: { locale: Locale; page: SitePage; site: SiteContent }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{site.navigation.skip}</a>
      <Header locale={locale} slug={page.slug} site={site} />
      <main id="main-content">
        <section className="content-hero">
          <div className="container content-hero-grid">
            <div>
              <p className="eyebrow eyebrow--sand">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="content-lead">{page.lead}</p>
            </div>
            <div className="hero-drawing" aria-hidden="true">
              <span>SE / {page.slug.toUpperCase()}</span>
              <i />
              <b>MOROCCO</b>
            </div>
          </div>
        </section>

        {page.facts.length > 0 && (
          <section className="fact-strip">
            <div className="container fact-grid">
              {page.facts.map((fact) => (
                <div key={`${fact.value}-${fact.label}`}>
                  <strong>{fact.value}</strong>
                  <span>{fact.label}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {page.profile && (
          <section className="content-section content-section--porcelain">
            <div className="container profile-layout">
              <div className="profile-image">
                <img src="/images/placeholders/founder-portrait-4x5.svg" alt="" width="960" height="1200" />
              </div>
              <div>
                <p className="eyebrow">{page.profile.eyebrow}</p>
                <h2>{page.profile.title}</h2>
                <p className="profile-text">{page.profile.text}</p>
                <blockquote>{page.profile.quote}</blockquote>
              </div>
            </div>
          </section>
        )}

        {page.items && (
          <section className="content-section">
            <div className="container">
              <div className="content-heading">
                <h2>{page.sectionTitle}</h2>
                {page.sectionIntro && <p>{page.sectionIntro}</p>}
              </div>
              <div className="content-card-grid">
                {page.items.map((item, index) => {
                  const body = (
                    <>
                      <div className="card-index"><span>{item.number ?? String(index + 1).padStart(2, "0")}</span><i /></div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      {item.href && <span className="card-link">{item.title}<Arrow /></span>}
                    </>
                  );
                  return item.href ? (
                    <Link key={item.title} href={destination(locale, item.href)} className="content-card content-card--link">{body}</Link>
                  ) : (
                    <article key={item.title} className="content-card">{body}</article>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {page.process && (
          <section className="content-section content-section--dark">
            <div className="container">
              <h2>{page.processTitle}</h2>
              <div className="process-grid">
                {page.process.map((item, index) => (
                  <article key={item.title}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.projects && (
          <section className="content-section">
            <div className="container">
              <h2>{page.sectionTitle}</h2>
              <div className="project-grid">
                {page.projects.map((project, index) => (
                  <article key={project.title} className="project-card">
                    <div className="project-visual" aria-hidden="true"><span>0{index + 1}</span><i /><b>{project.sector}</b></div>
                    <div className="project-copy">
                      <p className="eyebrow">{project.location}</p>
                      <h3>{project.title}</h3>
                      <p>{project.scope}</p>
                      <small>{project.role}</small>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {page.bullets && (
          <section className="content-section content-section--porcelain">
            <div className="container list-layout">
              <h2>{page.bulletTitle}</h2>
              <ol className="evidence-list">
                {page.bullets.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {page.contact && (
          <section className="content-section">
            <div className="container contact-page-grid">
              <div className="contact-details">
                <p className="eyebrow">{page.contact.eyebrow}</p>
                <h2>{page.contact.title}</h2>
                <p>{page.contact.intro}</p>
                <address>
                  <span>{page.contact.address}</span>
                  <a href={`mailto:${page.contact.email}`}>{page.contact.email}</a>
                  <a href={`tel:${page.contact.phone.replace(/\s/g, "")}`}>{page.contact.phone}</a>
                </address>
              </div>
              <form className="project-form" name="project-enquiry" method="POST" data-netlify="true" netlify-honeypot="company-website">
                <input type="hidden" name="form-name" value="project-enquiry" />
                <p className="honeypot"><label>Website<input name="company-website" /></label></p>
                <label><span>{page.contact.form.name}</span><input name="name" autoComplete="name" required /></label>
                <label><span>{page.contact.form.company}</span><input name="company" autoComplete="organization" required /></label>
                <label><span>{page.contact.form.email}</span><input name="email" type="email" autoComplete="email" required /></label>
                <label><span>{page.contact.form.service}</span><select name="service" required defaultValue=""><option value="" disabled>—</option>{page.contact.form.services.map((service) => <option key={service}>{service}</option>)}</select></label>
                <label className="form-wide"><span>{page.contact.form.message}</span><textarea name="message" rows={7} required /></label>
                <button className="button form-wide" type="submit">{page.contact.form.submit}<Arrow /></button>
              </form>
            </div>
          </section>
        )}

        {page.legal?.map((section) => (
          <section className="legal-section" key={section.title}>
            <div className="container legal-layout">
              <h2>{section.title}</h2>
              <div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            </div>
          </section>
        ))}

        {page.cta && (
          <section className="page-cta">
            <div className="container page-cta-grid">
              <div><h2>{page.cta.title}</h2><p>{page.cta.text}</p></div>
              {page.cta.href.startsWith("mailto:") ? (
                <a className="button button--sand" href={page.cta.href}>{page.cta.button}<Arrow /></a>
              ) : (
                <Link className="button button--sand" href={destination(locale, page.cta.href)}>{page.cta.button}<Arrow /></Link>
              )}
            </div>
          </section>
        )}
      </main>
      <Footer locale={locale} site={site} />
    </>
  );
}
