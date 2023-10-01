/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/reception'
      }
    ];
  }
};

module.exports = nextConfig
