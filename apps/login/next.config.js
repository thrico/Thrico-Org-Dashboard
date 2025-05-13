/** @type {import('next').NextConfig} */
module.exports = {
  output: 'standalone',
  transpilePackages: ["@repo/ui"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
