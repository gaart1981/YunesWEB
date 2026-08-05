import sharedPages from "@/content/pages-shared.json";
import en from "@/content/site-en.json";
import fr from "@/content/site-fr.json";
import ar from "@/content/site-ar.json";
import type { Locale } from "@/lib/home-content";
import {
  applyCompanyVoice,
  founderMessages,
  founderMessageTitles
} from "@/lib/brand-copy";

export const pageSlugs = [
  "services",
  "owners-engineering-amo",
  "electrical-mep-engineering",
  "local-engineering-partner-morocco",
  "sectors",
  "experience",
  "about",
  "contact",
  "legal-notice",
  "privacy-policy",
  "cookie-policy"
] as const;

export type SiteSlug = (typeof pageSlugs)[number];

export type Navigation = {
  home: string;
  services: string;
  sectors: string;
  experience: string;
  about: string;
  contact: string;
  cta: string;
  language: string;
  footerDescriptor: string;
  footerStatus: string;
  legal: string;
  privacy: string;
  cookies: string;
  address: string;
  email: string;
  phone: string;
  skip: string;
};

export type CardItem = {
  number?: string;
  title: string;
  text: string;
  href?: string;
};

export type ProcessItem = { title: string; text: string };
export type ProjectItem = {
  sector: string;
  title: string;
  location: string;
  scope: string;
  role: string;
};

export type SharedPage = {
  slug: SiteSlug;
  sectionTitle?: string;
  sectionIntro?: string;
  items?: CardItem[];
  processTitle?: string;
  process?: ProcessItem[];
  bulletTitle?: string;
  bullets?: string[];
  projects?: ProjectItem[];
  profile?: {
    type: string;
    eyebrow: string;
    title: string;
    text: string;
    quote: string;
  };
  contact?: {
    type: string;
    eyebrow: string;
    title: string;
    intro: string;
    email: string;
    phone: string;
    address: string;
    form: {
      name: string;
      company: string;
      email: string;
      service: string;
      message: string;
      submit: string;
      services: string[];
    };
  };
  legal?: Array<{ title: string; paragraphs: string[] }>;
  cta?: { title: string; text: string; button: string; href: string };
};

export type LocalizedPage = {
  seo: { title: string; description: string };
  eyebrow: string;
  title: string;
  lead: string;
  facts: Array<{ value: string; label: string }>;
};

export type SitePage = SharedPage & LocalizedPage;

export type SiteContent = {
  direction: "ltr" | "rtl";
  navigation: Navigation;
  pages: Record<SiteSlug, LocalizedPage>;
};

const sites: Record<Locale, SiteContent> = {
  en: en as SiteContent,
  fr: fr as SiteContent,
  ar: ar as SiteContent
};

const shared = sharedPages as Record<SiteSlug, SharedPage>;

export function isSiteSlug(value: string): value is SiteSlug {
  return pageSlugs.includes(value as SiteSlug);
}

export function getSiteContent(locale: Locale): SiteContent {
  return applyCompanyVoice(sites[locale], locale);
}

export function getPageContent(locale: Locale, slug: SiteSlug): SitePage {
  const page = applyCompanyVoice(
    {
      ...shared[slug],
      ...sites[locale].pages[slug]
    } as SitePage,
    locale
  );

  if (slug === "about") {
    return {
      ...page,
      profile: {
        type: page.profile?.type ?? "profile",
        eyebrow: page.profile?.eyebrow ?? founderMessageTitles[locale],
        title: founderMessageTitles[locale],
        text: founderMessages[locale],
        quote: page.profile?.quote ?? ""
      }
    };
  }

  return page;
}
