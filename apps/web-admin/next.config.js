/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com'], // Add all allowed domains here
  },
};

module.exports = nextConfig;
