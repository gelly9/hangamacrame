import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Phase 1 ships as a static site on GitHub Pages, which has no server.
  // Remove this (and `images.unoptimized`) when we move to a host with
  // serverless functions for the phase 3 shop.
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
