/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@wsvvrijheid/config',
    '@wsvvrijheid/context',
    '@wsvvrijheid/lib',
    '@wsvvrijheid/services',
    '@wsvvrijheid/ui',
    '@wsvvrijheid/utils',
  ],
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'nl', 'tr'],
  },
  redirects: async () => [
    {
      source: '/donate',
      destination: '/donation',
      permanent: true,
    },
  ],
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
  outputFileTracing: true,
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core-linux-x64-gnu',
        'node_modules/@swc/core-linux-x64-musl',
        'node_modules/@esbuild/linux-x64',
      ],
    },
  },
}

export default nextConfig
