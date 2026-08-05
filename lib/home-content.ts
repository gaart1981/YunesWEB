import en from "@/content/en/home.json";
import fr from "@/content/fr/home.json";
import ar from "@/content/ar/home.json";
import { applyCompanyVoice } from "@/lib/brand-copy";

export type Locale = "en" | "fr" | "ar";

export type HomeContent = typeof en;

const contentByLocale: Record<Locale, HomeContent> = {
  en,
  fr: fr as HomeContent,
  ar: ar as HomeContent
};

export const locales: Locale[] = ["en", "fr", "ar"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getHomeContent(locale: Locale): HomeContent {
  return applyCompanyVoice(contentByLocale[locale], locale);
}
