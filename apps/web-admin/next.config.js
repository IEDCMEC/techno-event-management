/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: 'loose' },
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com'], // Add all allowed domains here
  },
};

module.exports = removeImports(nextConfig);
