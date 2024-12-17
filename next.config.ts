/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    experimental: {
        // This will make the app fully client-side rendered
        appDir: true,
    }
}

module.exports = nextConfig