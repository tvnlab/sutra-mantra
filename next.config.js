/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: process.env.IMAGE_DOMAINS.split(",").map(hostname => ({
      protocol: 'https',
      hostname: hostname,
      port: '',
    })),
  },
};

module.exports = nextConfig;
