import type { MetadataRoute } from "next";

// Required by `output: "export"`: metadata routes must be explicitly static.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", disallow: "/" }]
  };
}
