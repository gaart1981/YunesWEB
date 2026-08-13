import en from "@/content/en/home.json";
import fr from "@/content/fr/home.json";
import ar from "@/content/ar/home.json";
import ru from "@/content/ru/home.json";
import de from "@/content/de/home.json";
import es from "@/content/es/home.json";
import { applyCompanyVoice } from "@/lib/brand-copy";

export type Locale = "en" | "fr" | "ar" | "ru" | "de" | "es";

export type HomeContent = typeof en;

const contentByLocale: Record<Locale, HomeContent> = {
  en,
  fr: fr as HomeContent,
  ar: ar as HomeContent,
  ru: ru as HomeContent,
  de: de as HomeContent,
  es: es as HomeContent
};

export const locales: Locale[] = ["en", "fr", "ar", "ru", "de", "es"];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getHomeContent(locale: Locale): HomeContent {
  return applyCompanyVoice(contentByLocale[locale], locale);
}
