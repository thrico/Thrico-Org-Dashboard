/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: ["@repo/ui", "@repo/shared"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.thrico.network",
      },
      {
        protocol: "https",
        hostname: "cdn.dribbble.com",
      },
      {
        protocol: "https",
        hostname: "i0.wp.com",
      },
    ],
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
