// @ts-check
const withPWA = require('next-pwa')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  i18n,
  images: {
    deviceSizes: [320, 480, 720, 1080],
    imageSizes: [150],
    domains: [
      'api.samenvvv.nl',
      'api.wsvvrijheid.nl',
      'pbs.twimg.com',
      'samenvvv.nl',
      'localhost',
    ],
  },
  modularizeImports: {
    'date-fns': { transform: 'date-fns/{{member}}' },
    lodash: { transform: 'lodash/{{member}}' },
  },
  outputFileTracing: true,
}

module.exports = withPWA({
  dest: 'public',
  register: true,
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  disable: process.env.NODE_ENV === 'development',
})(nextConfig)
