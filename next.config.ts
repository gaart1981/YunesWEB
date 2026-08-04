import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Fully static export. Every page in this site is prerendered at build time:
  // there are no API routes, server actions, middleware or ISR. Exporting to a
  // plain HTML tree removes all dependence on a host-specific Next.js adapter
  // and on publish-directory auto-detection.
  output: "export",
  // Emits /en/index.html rather than /en.html, so /en/ resolves natively on any
  // static host without rewrite rules.
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
