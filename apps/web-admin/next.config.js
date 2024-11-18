/** @type {import('next').NextConfig} */
const removeImports = require('next-remove-imports')();
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  experimental: { esmExternals: 'loose' },
  images: {
    domains: ['s.gravatar.com', 'cdn.auth0.com'], // Add all allowed domains here
  },
};

module.exports = withBundleAnalyzer(removeImports(nextConfig));
