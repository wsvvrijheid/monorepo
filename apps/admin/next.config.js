// eslint-disable-next-line @typescript-eslint/no-var-requires
const withNx = require('@nrwl/next/plugins/with-nx')

const { i18n } = require('./next-i18next.config')

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  i18n,
  images: {
    domains: [
      'api.samenvvv.nl',
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
}

module.exports = withNx(nextConfig)
