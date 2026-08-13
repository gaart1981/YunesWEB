import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-url";
import { ContentPage } from "@/components/ContentPage";
import { isLocale, locales } from "@/lib/home-content";
import { getPageContent, getSiteContent, isSiteSlug, pageSlugs } from "@/lib/site-content";
import { JsonLd, pageGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.flatMap((locale) => pageSlugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSiteSlug(slug)) return {};
  const page = getPageContent(locale, slug);
  return {
    metadataBase: new URL(SITE_URL),
    title: page.seo.title,
    description: page.seo.description,
    alternates: {
      canonical: `/${locale}/${slug}`,
      languages: {
        en: `/en/${slug}`,
        fr: `/fr/${slug}`,
        ar: `/ar/${slug}`,
        ru: `/ru/${slug}`,
        de: `/de/${slug}`,
        es: `/es/${slug}`,
        "x-default": `/en/${slug}`
      }
    },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      siteName: "Salimi Engineering",
      type: "website",
      url: `/${locale}/${slug}/`,
      locale,
      images: [{ url: "/images/brand/og-salimi-engineering.png", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: page.seo.title,
      description: page.seo.description,
      images: ["/images/brand/og-salimi-engineering.png"]
    }
  };
}

export default async function PublicContentPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isSiteSlug(slug)) notFound();
  const page = getPageContent(locale, slug);
  return (
    <>
      <JsonLd data={pageGraph(locale, slug, page.title, page.seo.description)} />
      <ContentPage locale={locale} page={page} site={getSiteContent(locale)} />
    </>
  );
}
