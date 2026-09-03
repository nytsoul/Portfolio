import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  typedRoutes: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "github-readme-activity-graph.vercel.app" },
      { protocol: "https", hostname: "api.github.com" },
    ],
  },
  // three.js / R3F are client-only; keep them out of the server bundle trace
  serverExternalPackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

export default nextConfig;
