import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
}

export default nextConfig
