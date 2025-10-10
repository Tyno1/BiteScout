import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})


/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Essential performance fixes
  compress: true,
  
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', '@tanstack/react-query'],
  },
  
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.amazonaws.com" },
      { protocol: "https", hostname: "*.s3.*.amazonaws.com" },
    ],
    formats: ['image/webp', 'image/avif', 'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/svg+xml'],
    minimumCacheTTL: 60,
  },
  
  serverExternalPackages: ['axios'],
  webpack: (config) => {
    config.resolve.fallback = {
      crypto: false,
      assert: false,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
};

export default withBundleAnalyzer(nextConfig)
