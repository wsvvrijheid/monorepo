import { withHydrationOverlayWebpack } from '@builder.io/react-hydration-overlay/webpack'

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
