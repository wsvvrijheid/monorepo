// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

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
      'aktifhaber.com',
      'www.turkishminute.com',
      'api.samenvvv.nl',
      'pbs.twimg.com',
      'api.wsvvrijheid.nl',
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
      'ipa.news',
      'static.wixstatic.com',
      'www.amnesty.org',
    ],
  },
  modularizeImports: {
    'date-fns': { transform: 'date-fns/{{member}}' },
    lodash: { transform: 'lodash/{{member}}' },
  },
  outputFileTracingExcludes: {
    '*': ['**swc/core**'],
  },
  nx: {
    // Set this to true if you would like to to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },
}

module.exports = withNx(nextConfig)
