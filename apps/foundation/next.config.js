// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')
const path = require('path')

const { i18n } = require('./next-i18next.config')

const isProd = process.env.NODE_ENV === 'production'
const vercelUrl = process.env.VERCEL_URL

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  i18n,
  assetPrefix: isProd ? vercelUrl : undefined,
  images: {
    domains: [
      'api.samenvvv.nl',
      'api.wsvvrijheid.nl',
      'wsvvrijheid.nl',
      'localhost',
    ],
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
  output: 'standalone',
  experimental: {
    outputFileTracingRoot: path.join(__dirname, '../../'),
  },
}

module.exports = withNx(nextConfig)
