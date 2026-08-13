import type { ProjectItem, SiteSlug } from "@/lib/site-content";

/**
 * Which prior-experience records are genuinely relevant to which page.
 *
 * Every page previously received `projects.slice(0, 3)`, so Owner's
 * Engineering, Electrical & MEP, Local Partner, Sectors and Services all
 * showed the same first three records regardless of what the page was about.
 * That is not evidence — it is filler, and on a page whose whole purpose is
 * credibility it actively undermines the claim.
 *
 * The mapping below is explicit and deterministic. Records are referenced by
 * the stable `id` in content/site-*.json rather than by array position,
 * because project titles and sectors are localised while ids are not.
 *
 * No project is invented here. This module only selects from records that
 * already exist in the repository, and the founder-attribution disclosure is
 * rendered alongside them by ContentPage.
 */
export const RELATED_EXPERIENCE: Partial<Record<SiteSlug, readonly string[]>> = {
  // Owner-side work: reviewing and supervising on behalf of the client.
  // Manor house is the explicit owner-side review and supervision record;
  // the two call-centres are coordinated design sets that an owner's engineer
  // would review and sign off.
  "owners-engineering-amo": ["manor-systems", "citibank-callcentre", "tinkoff-callcentre"],

  // Electrical and MEP scopes: load calculations, distribution, life-safety
  // and coordinated multi-discipline document sets.
  "electrical-mep-engineering": ["citibank-callcentre", "tinkoff-callcentre", "beeline-office"],

  // Local delivery: industrial site work, distributed infrastructure across
  // multiple cities, and on-site supervision — the closest analogues to
  // contractor coordination and site presence.
  "local-engineering-partner-morocco": ["faurecia-plant", "tram-lighting", "manor-systems"],

  // Sectors: deliberately spans three different project environments.
  sectors: ["mailru-office", "faurecia-plant", "tram-lighting"],

  // Services overview: breadth of the offer across corporate, banking and
  // industrial environments.
  services: ["mailru-office", "citibank-callcentre", "faurecia-plant"]
};

/**
 * Resolve a page's related records, preserving the mapping order.
 * Unknown ids are skipped rather than throwing, so a content edit that renames
 * a project degrades to fewer cards instead of breaking the build.
 */
export function getRelatedExperience(
  slug: SiteSlug,
  records: readonly ProjectItem[]
): ProjectItem[] {
  const ids = RELATED_EXPERIENCE[slug];
  if (!ids) return [];
  return ids
    .map((id) => records.find((record) => record.id === id))
    .filter((record): record is ProjectItem => Boolean(record));
}
