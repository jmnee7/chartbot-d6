import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ],
  },
};

export default nextConfig;
