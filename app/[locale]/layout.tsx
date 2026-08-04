import type { ReactNode } from "react";
import { Manrope, Noto_Sans_Arabic } from "next/font/google";
import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/home-content";
import "@/styles/globals.css";
import "@/styles/content-pages.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-latin",
  display: "swap"
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap"
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${manrope.variable} ${arabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
