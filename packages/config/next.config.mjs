import { withHydrationOverlayWebpack } from '@builder.io/react-hydration-overlay/webpack'

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@fc/config',
    '@fc/context',
    '@fc/lib',
    '@fc/services',
    '@fc/ui',
    '@fc/utils',
    '@builder.io/react-hydration-overlay',
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
    remotePatterns: [
      {
        hostname: 'api.freedomcombination.com',
      },
    ],
    deviceSizes: [320, 480, 720, 1080],
    imageSizes: [150],
  },
  webpack: (config, options) => {
    config = withHydrationOverlayWebpack({
      appRootSelector: '#__next',
      isMainAppEntryPoint: entryPointName =>
        !options.isServer && entryPointName === 'pages/_app',
    })(config)

    return config
  },
}

export default nextConfig
