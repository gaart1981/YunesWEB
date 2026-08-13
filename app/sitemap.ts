import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";
import { locales } from "@/lib/home-content";
import { pageSlugs } from "@/lib/site-content";

export const dynamic = "force-static";

/**
 * Every published page, in every language, with reciprocal alternates so the
 * four language versions are understood as one cluster rather than as
 * duplicates. Editor, API and preview paths are absent by construction: this
 * is generated from the route table, not from a crawl.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const alternatesFor = (path: string) => ({
    languages: Object.fromEntries([
      ...locales.map((locale) => [locale, `${SITE_URL}/${locale}${path}`]),
      ["x-default", `${SITE_URL}/en${path}`]
    ])
  });

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    entries.push({
      url: `${SITE_URL}/${locale}/`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: alternatesFor("/")
    });
  }

  for (const slug of pageSlugs) {
    // Legal pages are reference documents: indexable, but they are not what the
    // site is competing on.
    const isReference = slug.includes("legal") || slug.includes("policy");
    for (const locale of locales) {
      entries.push({
        url: `${SITE_URL}/${locale}/${slug}/`,
        changeFrequency: isReference ? "yearly" : "monthly",
        priority: isReference ? 0.3 : slug === "contact" ? 0.9 : 0.8,
        alternates: alternatesFor(`/${slug}/`)
      });
    }
  }

  return entries;
}
