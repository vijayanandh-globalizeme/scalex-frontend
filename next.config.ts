import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.s3.ap-south-1.amazonaws.com',
      },
    ],
    // Must be less than DOWNLOAD_TTL (86400 s) so Next.js always re-fetches
    // the optimized image before the presigned S3 URL expires.
    minimumCacheTTL: 82800,
  },
};

export default nextConfig;
