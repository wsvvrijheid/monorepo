// eslint-disable-next-line @typescript-eslint/no-var-requires

const withNx = require('@nrwl/next/plugins/with-nx')
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache.js')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/

//Next.js configuration
const config = {
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
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

//PWA configuration + Next.js configuration
const nextConfig = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  runtimeCaching,
})(config)

module.exports = withNx(nextConfig)
