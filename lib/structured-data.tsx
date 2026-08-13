import { SITE_URL } from "@/lib/site-url";
import businessFacts from "@/content/business-facts.json";
import type { Locale } from "@/lib/home-content";
import type { SiteSlug } from "@/lib/site-content";

/**
 * JSON-LD for search engines and AI assistants.
 *
 * Every value here is either a verified business fact or text already visible
 * on the page. Nothing is added because a schema field exists: there is no
 * address, no founding date, no employee count, no rating and no opening
 * hours, because none of those are confirmed. LocalBusiness is deliberately
 * not used — it implies a public premises the company has not confirmed.
 *
 * Stable @id values let the same entity be recognised across pages and
 * languages rather than read as four unrelated organisations.
 */

const ORG_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/#yunes-salimi`;
const SITE_ID = `${SITE_URL}/#website`;

const EMAIL = businessFacts.contact.email;
const PHONE = "+212663056547";

const SERVICE_IDS: Partial<Record<SiteSlug, string>> = {
  "owners-engineering-amo": `${SITE_URL}/#service-owners-engineering`,
  "electrical-mep-engineering": `${SITE_URL}/#service-electrical-mep`,
  "local-engineering-partner-morocco": `${SITE_URL}/#service-local-partner`
};

function organisation(locale: Locale, description: string) {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: "Salimi Engineering",
    url: `${SITE_URL}/${locale}/`,
    description,
    email: EMAIL,
    telephone: PHONE,
    founder: { "@id": PERSON_ID },
    areaServed: { "@type": "Country", name: "Morocco" },
    availableLanguage: ["en", "fr", "ar"],
    knowsAbout: [
      "Owner's engineering",
      "Electrical engineering design",
      "MEP coordination",
      "Construction supervision",
      "Testing and commissioning"
    ],
    logo: `${SITE_URL}/images/brand/salimi-engineering-primary-navy.svg`
  };
}

function person() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "SALIMI Yunes",
    jobTitle: "Founder and lead engineer",
    worksFor: { "@id": ORG_ID }
  };
}

function website(locale: Locale) {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: SITE_URL,
    name: "Salimi Engineering",
    inLanguage: locale,
    publisher: { "@id": ORG_ID }
  };
}

function breadcrumbs(locale: Locale, slug: SiteSlug, title: string) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Salimi Engineering", item: `${SITE_URL}/${locale}/` },
      { "@type": "ListItem", position: 2, name: title, item: `${SITE_URL}/${locale}/${slug}/` }
    ]
  };
}

export function homeGraph(locale: Locale, description: string) {
  return {
    "@context": "https://schema.org",
    "@graph": [organisation(locale, description), person(), website(locale)]
  };
}

export function pageGraph(
  locale: Locale,
  slug: SiteSlug,
  title: string,
  description: string
) {
  const graph: object[] = [
    organisation(locale, description),
    website(locale),
    breadcrumbs(locale, slug, title)
  ];

  const serviceId = SERVICE_IDS[slug];
  if (serviceId) {
    graph.push({
      "@type": "Service",
      "@id": serviceId,
      name: title,
      description,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Morocco" },
      serviceType: "Engineering"
    });
  }

  if (slug === "about") graph.push(person());

  return { "@context": "https://schema.org", "@graph": graph };
}

/** Renders the graph. JSON.stringify escaping keeps the payload injection-safe. */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
