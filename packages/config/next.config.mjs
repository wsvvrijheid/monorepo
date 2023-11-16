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
  },
}

export default nextConfig
