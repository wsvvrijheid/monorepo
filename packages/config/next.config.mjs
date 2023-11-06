/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
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
