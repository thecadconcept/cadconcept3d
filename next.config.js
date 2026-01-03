/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'scontent.cdninstagram.com',
      'scontent-iad3-1.cdninstagram.com',
      'scontent-lga3-1.cdninstagram.com',
      'scontent-ort2-2.cdninstagram.com',
      'instagram.com',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
      },
    ],
  },
  webpack: (config, { isServer }) => {
    // Handle Three.js and related libraries
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      }
    }
    return config
  },
}

module.exports = nextConfig

