import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site-url";

// Required by `output: "export"`: metadata routes must be explicitly static.
export const dynamic = "force-static";

/**
 * Public crawl policy.
 *
 * The pre-launch blanket disallow is lifted. Search and AI assistants are both
 * allowed, because a cold investor searching for an owner's representative in
 * Morocco may arrive from either. Editor and preview paths stay closed.
 *
 * Search crawlers and training crawlers are listed separately and deliberately:
 * they are different decisions, and either can be reversed here without
 * touching the other.
 */
export default function robots(): MetadataRoute.Robots {
  const disallow = ["/editjson/", "/api/", "/.netlify/", "/preview/"];

  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },

      // Assistant search and retrieval — how these tools answer a live question.
      { userAgent: "OAI-SearchBot", allow: "/", disallow },
      { userAgent: "ChatGPT-User", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Claude-SearchBot", allow: "/", disallow },
      { userAgent: "Claude-User", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },

      // Model training. A separate decision from the above; allowed here so the
      // company can be described accurately rather than guessed at.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "Applebot-Extended", allow: "/", disallow },
      { userAgent: "CCBot", allow: "/", disallow }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
