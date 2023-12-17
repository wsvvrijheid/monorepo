import { FC, useState } from 'react'

import { HydrationOverlay } from '@builder.io/react-hydration-overlay'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { useCookie } from 'react-use'

import { defaultSeo, i18nConfig, themes } from '@wsvvrijheid/config'
import { CookieBanner } from '@wsvvrijheid/ui'

const { ToastContainer } = createStandaloneToast()

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: { networkMode: 'always' },
          queries: { networkMode: 'always' },
        },
      }),
  )
  const { locale } = useRouter()
  const [cookie, updateCookie] = useCookie('lotus-cookiesAccepted')

  const onAllow = () => {
    updateCookie('true')
  }

  return (
    <HydrationOverlay>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ChakraProvider theme={themes.lotus}>
            <DefaultSeo {...defaultSeo.lotus[locale]} />
            <Component {...pageProps} />
            {!cookie && <CookieBanner onAllow={onAllow} />}
            <Analytics />
            <ToastContainer />
          </ChakraProvider>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HydrationOverlay>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
