/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // This will make TypeScript errors show as warnings during development
    ignoreBuildErrors: true,
  },
  experimental: {
    typedRoutes: true
  },
}

module.exports = nextConfig
