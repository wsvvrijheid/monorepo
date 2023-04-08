// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const path = require('path')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  i18n,
  images: {
    deviceSizes: [320, 480, 720, 1080],
    imageSizes: [150],
    domains: [
      'api.samenvvv.nl',
      'api.wsvvrijheid.nl',
      'kunsthalte.com',
      'localhost',
    ],
  },
  modularizeImports: {
    'date-fns': { transform: 'date-fns/{{member}}' },
    lodash: { transform: 'lodash/{{member}}' },
  },
  experimental: {
    outputFileTracingExcludes: {
      '*': ['**swc/core**'],
    },
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

module.exports = withNx(nextConfig)
