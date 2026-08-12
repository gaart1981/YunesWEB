/**
 * Canonical public origin for the site.
 *
 * Used as Next.js `metadataBase`, which turns the relative canonical and
 * hreflang paths into absolute URLs. Search engines ignore relative hreflang
 * values, so this is required for the multilingual setup to be understood.
 *
 * Override per environment with NEXT_PUBLIC_SITE_URL (for example, to point a
 * deploy preview at its own origin instead of production).
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://salimiengineering.com";
