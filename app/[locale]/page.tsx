import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-url";
import { HomePage } from "@/components/HomePage";
import { getHomeContent, isLocale, locales } from "@/lib/home-content";
import { JsonLd, homeGraph } from "@/lib/structured-data";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const content = getHomeContent(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: content.seo.title,
    description: content.seo.description,
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        fr: "/fr/",
        ar: "/ar/",
        ru: "/ru/",
        de: "/de/",
        es: "/es/",
        "x-default": "/en/"
      }
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      siteName: "Salimi Engineering",
      type: "website",
      url: `/${locale}/`,
      locale,
      images: [{ url: "/images/brand/og-salimi-engineering.png", width: 1200, height: 630 }]
    },
    twitter: {
      card: "summary_large_image",
      title: content.seo.title,
      description: content.seo.description,
      images: ["/images/brand/og-salimi-engineering.png"]
    }
  };
}

export default async function LocaleHome({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const content = getHomeContent(locale);
  return (
    <>
      <JsonLd data={homeGraph(locale, content.seo.description)} />
      <HomePage locale={locale} content={content} />
    </>
  );
}
