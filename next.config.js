/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/main/home'
      }
    ];
  }
};

module.exports = nextConfig
