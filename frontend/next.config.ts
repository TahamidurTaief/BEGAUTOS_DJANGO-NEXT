import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "author.begautos.com",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1:8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        pathname: "/media/**",
      },
      {
        protocol: "https",
        hostname: "begautos.passmcq.com",
        pathname: "/media/**",
      },
    ],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/(.*)",
  //       has: [
  //         {
  //           type: "header",
  //           key: "x-forwarded-proto",
  //           value: "http",
  //         },
  //       ],
  //       destination: "https://begautos.com/:path*",
  //       permanent: true,
  //     },
  //   ];
  //   // return []
  // },
};

export default nextConfig;

