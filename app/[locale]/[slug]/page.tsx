import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { isLocale, locales } from "@/lib/home-content";
import { getPageContent, getSiteContent, isSiteSlug, pageSlugs } from "@/lib/site-content";

export function generateStaticParams() {
  return locales.flatMap((locale) => pageSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSiteSlug(slug)) return {};
  const page = getPageContent(locale, slug);
  return {
    title: page.seo.title,
    description: page.seo.description,
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        en: `/en/${slug}`,
        fr: `/fr/${slug}`,
        ar: `/ar/${slug}`,
        ru: `/ru/${slug}`,
        "x-default": `/en/${slug}`
      }
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      siteName: "Salimi Engineering",
      type: "website"
    }
  };
}

export default async function PublicContentPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSiteSlug(slug)) notFound();
  return <ContentPage locale={locale} page={getPageContent(locale, slug)} site={getSiteContent(locale)} />;
}
