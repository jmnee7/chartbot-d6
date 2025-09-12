import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/data/:path*",
        destination:
          "https://raw.githubusercontent.com/0seo8/d6/main/frontend/public/data/:path*",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: "",
        pathname: "/cm/**",
      },
      {
        protocol: "https",
        hostname: "cdnimg.melon.co.kr",
        port: "",
        pathname: "/cm2/**",
      },
      {
        protocol: "https",
        hostname: "image.genie.co.kr",
        port: "",
        pathname: "/Y/**",
      },
      {
        protocol: "https",
        hostname: "musicmeta-phinf.pstatic.net",
        port: "",
        pathname: "/album/**",
      },
      {
        protocol: "https",
        hostname: "cdn.music-flo.com",
        port: "",
        pathname: "/image/**",
      },
      {
        protocol: "https",
        hostname: "image.bugsm.co.kr",
        port: "",
        pathname: "/album/**",
      },
    ],
  },
};

export default nextConfig;
