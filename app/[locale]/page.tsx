import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_URL } from "@/lib/site-url";
import { HomePage } from "@/components/HomePage";
import { getHomeContent, isLocale, locales } from "@/lib/home-content";

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
    robots: { index: false, follow: false },
    alternates: {
      canonical: `/${locale}/`,
      languages: {
        en: "/en/",
        fr: "/fr/",
        ar: "/ar/",
        ru: "/ru/",
        "x-default": "/en/"
      }
    },
    openGraph: {
      title: content.seo.title,
      description: content.seo.description,
      siteName: "Salimi Engineering",
      type: "website"
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

  return <HomePage locale={locale} content={getHomeContent(locale)} />;
}
