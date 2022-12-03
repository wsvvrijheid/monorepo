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
    domains: [
      'api.samenvvv.nl',
      'wsvv-api.onrender.com',
      'admin.wsvvrijheid.nl',
      'localhost',
      'amnesty.imgix.net',
      'boldmedya.com',
      'dekanttekening.nl',
      'cdn.nos.nl',
      'www.rtlnieuws.nl',
      'image.writeclouds.com',
      'www.tr724.com',
      'images0.persgroep.net',
      'image.shaber3.com',
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
