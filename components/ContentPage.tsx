import Link from "next/link";
import { BrandLogo } from "@/components/BrandLogo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/home-content";
import { locales } from "@/lib/home-content";
import type { SiteContent, SitePage, SiteSlug } from "@/lib/site-content";
import { getPageContent } from "@/lib/site-content";
import { getRelatedExperience } from "@/lib/related-experience";

const whatsappLabels: Record<Locale, string> = {
  en: "WhatsApp Salimi Engineering",
  fr: "WhatsApp Salimi Engineering",
  ar: "راسل Salimi Engineering عبر واتساب",
  ru: "Написать в WhatsApp",
  de: "WhatsApp schreiben",
  es: "Escribir por WhatsApp"
};

// Abstract technical drawings only. These are decorative: they carry no claim
// about a specific project and cannot be mistaken for site photography.
// Nothing on this site presents an image as evidence of work performed.
const pageImages: Partial<Record<SiteSlug, string>> = {
  // Line illustrations only. Each is a drawing, not a photograph: it sets the
  // technical register of the page without claiming any specific project.
  // Assignment follows what each page is about.
  services: "/images/graphics/production-facility.webp",
  "owners-engineering-amo": "/images/graphics/development-masterplan.webp",
  "electrical-mep-engineering": "/images/graphics/industrial-plant-systems.webp",
  "local-engineering-partner-morocco": "/images/graphics/production-facility.webp",
  sectors: "/images/graphics/project-environments.webp",
  about: "/images/graphics/project-documentation.webp",
  contact: "/images/graphics/plant-room-services.webp"
};

function Arrow() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" width="18" height="18">
      <path d="M3 10h13M11 5l5 5-5 5" />
    </svg>
  );
}

function destination(locale: Locale, href: string) {
  if (/^(mailto:|tel:|https?:)/.test(href)) return href;
  return `/${locale}/${href}`;
}

function Header({ locale, slug, site }: { locale: Locale; slug: SiteSlug; site: SiteContent }) {
  const nav = site.navigation;
  const whatsappHref = `https://wa.me/${nav.phone.replace(/[^\d]/g, "")}`;
  const links = [
    ["services", nav.services],
    ["sectors", nav.sectors],
    ["experience", nav.experience],
    ["about", nav.about],
    ["contact", nav.contact]
  ] as const;

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={`/${locale}/`} className="brand" aria-label={`${nav.home} — Salimi Engineering`}>
          <BrandLogo variant="primary" tone="navy" className="brand-logo brand-logo--header" />
        </Link>
        <nav className="desktop-nav" aria-label={nav.language}>
          {links.map(([href, label]) => (
            <Link key={href} href={`/${locale}/${href}`} aria-current={slug === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageSwitcher locale={locale} label={nav.language} path={`/${slug}/`} />
          <Link className="button button--small" href={`/${locale}/contact`}>{nav.cta}</Link>
        </div>
        <details className="mobile-menu">
          <summary aria-label={nav.services}><span /><span /></summary>
          <nav>
            <Link href={`/${locale}/`}>{nav.home}</Link>
            {links.map(([href, label]) => <Link key={href} href={`/${locale}/${href}`}>{label}</Link>)}
            <Link href={`/${locale}/contact`}>{nav.cta}</Link>
            <a href={whatsappHref} target="_blank" rel="noreferrer">{whatsappLabels[locale]}</a>
            <LanguageSwitcher locale={locale} label={nav.language} path={`/${slug}/`} variant="inline" />
          </nav>
        </details>
      </div>
    </header>
  );
}

function Footer({ locale, site }: { locale: Locale; site: SiteContent }) {
  const nav = site.navigation;
  const phoneHref = `tel:${nav.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${nav.phone.replace(/[^\d]/g, "")}`;
  return (
    <footer className="site-footer">
      <div className="container footer-expanded">
        <div>
          <Link href={`/${locale}/`} className="footer-brand-link" aria-label={`${nav.home} — Salimi Engineering`}><BrandLogo variant="primary" tone="white" className="brand-logo brand-logo--footer" /></Link>
          <p>{nav.footerDescriptor}</p>
        </div>
        <div className="footer-contact">
          <span>{nav.address}</span>
          <a href={`mailto:${nav.email}`}>{nav.email}</a>
          <a href={phoneHref}>{nav.phone}</a>
          <a href={whatsappHref} target="_blank" rel="noreferrer">{whatsappLabels[locale]}</a>
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
        <span>Morocco · Engineering & Project Delivery</span>
      </div>
    </footer>
  );
}

export function ContentPage({ locale, page, site }: { locale: Locale; page: SitePage; site: SiteContent }) {
  const pageImage = pageImages[page.slug];
  const experienceRecords = getPageContent(locale, "experience").projects ?? [];
  const relatedProjects = page.relatedExperience ? getRelatedExperience(page.slug, experienceRecords) : [];
  const phoneHref = `tel:${site.navigation.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${site.navigation.phone.replace(/[^\d]/g, "")}`;

  return (
    <>
      <a className="skip-link" href="#main-content">{site.navigation.skip}</a>
      <Header locale={locale} slug={page.slug} site={site} />
      <main id="main-content">
        <section className={page.legal ? "content-hero content-hero--reference" : "content-hero"}>
          <div className={`container content-hero-grid${pageImage ? "" : " content-hero-grid--wide"}`}>
            <div>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1>{page.title}</h1>
              <p className="content-lead">{page.lead}</p>
              {!page.legal && (
                <div className="hero-actions content-hero-actions">
                  {page.slug === "contact" ? (
                    /* On the contact page the project CTA would navigate to the
                       page the visitor is already on, so WhatsApp takes the
                       primary slot - here it is the actual next step. */
                    <a className="button button--sand" href={whatsappHref} target="_blank" rel="noreferrer">
                      {whatsappLabels[locale]}<Arrow />
                    </a>
                  ) : (
                    <>
                      <Link className="button button--sand" href={`/${locale}/contact`}>{site.navigation.cta}<Arrow /></Link>
                      <a className="text-link" href={whatsappHref} target="_blank" rel="noreferrer">{whatsappLabels[locale]}<Arrow /></a>
                    </>
                  )}
                </div>
              )}
            </div>
            {pageImage && (
              <div className="content-hero-media" aria-hidden="true">
                <img src={pageImage} alt="" width="1448" height="1086" />
              </div>
            )}
          </div>
        </section>

        {page.facts.length > 0 && (
          <section className="fact-strip"><div className="container fact-grid">
            {page.facts.map((fact) => <div key={`${fact.value}-${fact.label}`}><strong>{fact.value}</strong><span>{fact.label}</span></div>)}
          </div></section>
        )}

        {page.clientSituation && (
          <section className="content-section content-section--porcelain">
            <div className="container situation-layout">
              <h2>{page.clientSituation.title}</h2>
              <ul className="situation-list">
                {page.clientSituation.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </section>
        )}

        {page.companyModel && (
          <section className="content-section">
            <div className="container model-layout">
              <div className="model-intro">
                <h2>{page.companyModel.title}</h2>
                <p>{page.companyModel.text}</p>
              </div>
              <ul className="model-points">
                {page.companyModel.points.map((point) => (
                  <li key={point.title}><h3>{point.title}</h3><p>{point.text}</p></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page.engagementRoles && (
          <section className="content-section content-section--porcelain">
            <div className="container">
              <h2>{page.engagementRoles.title}</h2>
              <ul className="role-grid">
                {page.engagementRoles.items.map((role) => (
                  <li key={role.title}><h3>{role.title}</h3><p>{role.text}</p></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page.profile && (
          <section className="content-section content-section--porcelain">
            <div className="container profile-layout">
              <div className="profile-image"><img src="/images/people/younes-salimi-about.webp" alt={page.profile.imageAlt} width="560" height="700" /></div>
              <div><p className="eyebrow">{page.profile.eyebrow}</p><h2>{page.profile.title}</h2><p className="profile-text">{page.profile.text}</p><blockquote>{page.profile.quote}</blockquote></div>
            </div>
          </section>
        )}

        {page.items && (
          <section className="content-section"><div className="container">
            <div className="content-heading"><h2>{page.sectionTitle}</h2>{page.sectionIntro && <p>{page.sectionIntro}</p>}</div>
            <div className="content-card-grid">
              {page.items.map((item, index) => {
                const body = <><div className="card-index"><span>{item.number ?? String(index + 1).padStart(2, "0")}</span><i /></div><h3>{item.title}</h3><p>{item.text}</p>{item.href && <span className="card-link">{item.title}<Arrow /></span>}</>;
                return item.href ? <Link key={item.title} href={destination(locale, item.href)} className="content-card content-card--link">{body}</Link> : <article key={item.title} className="content-card">{body}</article>;
              })}
            </div>
          </div></section>
        )}

        {page.process && (
          <section className="content-section content-section--warm"><div className="container">
            <h2>{page.processTitle}</h2>
            <div className="process-grid">{page.process.map((item, index) => <article key={item.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
          </div></section>
        )}

        {page.confidentiality && (
          <section className="content-section content-section--porcelain">
            <div className="container confidentiality">
              <h2>{page.confidentiality.title}</h2>
              <p>{page.confidentiality.text}</p>
            </div>
          </section>
        )}

        {page.projects && (
          <section className="content-section"><div className="container">
            <h2>{page.sectionTitle}</h2>
            {page.sectionIntro && <p className="section-intro attribution-note">{page.sectionIntro}</p>}
            <div className="record-list">{page.projects.map((project) => (
              <article key={project.title} className="record">
                <div className="record__head">
                  <h3>{project.title}</h3>
                  <p className="record__meta"><span>{project.sector}</span><span>{project.location}</span></p>
                </div>
                <dl className="record__body">
                  <div><dt>{site.navigation.recordScope}</dt><dd>{project.scope}</dd></div>
                  <div><dt>{site.navigation.recordRole}</dt><dd>{project.role}</dd></div>
                </dl>
              </article>
            ))}</div>
          </div></section>
        )}

        {page.engagementFormats && (
          <section className="content-section content-section--porcelain">
            <div className="container">
              <h2>{page.engagementFormats.title}</h2>
              <ul className="format-rows">
                {page.engagementFormats.items.map((format) => (
                  <li key={format.title}><h3>{format.title}</h3><p>{format.text}</p></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page.teamModel && (
          <section className="content-section content-section--ink">
            <div className="container team-model-layout">
              <div>
                <h2>{page.teamModel.title}</h2>
                <p>{page.teamModel.text}</p>
              </div>
              <ul className="team-points">
                {page.teamModel.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </div>
          </section>
        )}

        {page.clientWorkflow && (
          <section className="content-section">
            <div className="container">
              <h2>{page.clientWorkflow.title}</h2>
              <ul className="workflow-rows">
                {page.clientWorkflow.items.map((step) => (
                  <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {page.bullets && (
          <section className="content-section content-section--porcelain"><div className="container list-layout">
            <h2>{page.bulletTitle}</h2>
            <ol className="evidence-list">{page.bullets.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>)}</ol>
          </div></section>
        )}

        {page.relatedExperience && relatedProjects.length > 0 && (
          <section className="content-section content-section--porcelain">
            <div className="container">
              <h2>{page.relatedExperience.title}</h2>
              <p className="attribution-note">{site.navigation.priorExperienceNote}</p>
              <ul className="evidence-rows">
                {relatedProjects.map((project) => (
                  <li key={project.title} className="evidence-row">
                    <div className="evidence-row__head">
                      <h3>{project.title}</h3>
                      <p className="evidence-meta"><span>{project.sector}</span><span>{project.location}</span></p>
                    </div>
                    <p className="evidence-scope">{project.scope}</p>
                    <p className="evidence-role">{project.role}</p>
                  </li>
                ))}
              </ul>
              <Link className="text-link" href={`/${locale}/experience`}>{site.navigation.experience}<Arrow /></Link>
            </div>
          </section>
        )}

        {page.contact && (
          <section className="content-section"><div className="container contact-page-grid">
            <div className="contact-details">
              <p className="eyebrow">{page.contact.eyebrow}</p><h2>{page.contact.title}</h2><p>{page.contact.intro}</p>
              <address><span>{page.contact.address}</span><a href={`mailto:${page.contact.email}`}>{page.contact.email}</a><a href={phoneHref}>{page.contact.phone}</a><a href={whatsappHref} target="_blank" rel="noreferrer">{whatsappLabels[locale]}</a></address>
              {page.whatToSend && (
                <div className="what-to-send">
                  <h3>{page.whatToSend.title}</h3>
                  <ul>{page.whatToSend.items.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              )}
              {page.privacyNote && (
                <p className="privacy-note">
                  {page.privacyNote} <Link href={`/${locale}/privacy-policy`}>{site.navigation.privacy}</Link>
                </p>
              )}
            </div>
            {/* The enquiry form is withheld until Netlify Forms delivery is
                configured and verified. A form that accepts a submission and
                delivers nothing is worse than no form: the visitor believes
                they have made contact. Email, phone and WhatsApp below all
                work. To restore, re-render this block and put back
                public/__forms.html with matching field names. */}
          </div></section>
        )}

        {page.legal?.map((section) => <section className="legal-section" key={section.title}><div className="container legal-layout"><h2>{section.title}</h2><div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>)}

        {page.cta && (
          <section className="page-cta"><div className="container page-cta-grid">
            <div><h2>{page.cta.title}</h2><p>{page.cta.text}</p></div>
            {/^(mailto:|tel:|https?:)/.test(page.cta.href) ? <a className="button button--sand" href={page.cta.href} target={page.cta.href.startsWith("http") ? "_blank" : undefined} rel={page.cta.href.startsWith("http") ? "noreferrer" : undefined}>{page.cta.button}<Arrow /></a> : <Link className="button button--sand" href={destination(locale, page.cta.href)}>{page.cta.button}<Arrow /></Link>}
          </div></section>
        )}
      </main>
      <Footer locale={locale} site={site} />
    </>
  );
}
