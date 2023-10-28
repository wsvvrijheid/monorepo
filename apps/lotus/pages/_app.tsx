import { FC, useState } from 'react'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  Hydrate,
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
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider>
          <ChakraProvider theme={themes.lotus}>
            <DefaultSeo {...defaultSeo.lotus[locale]} />
            <Component {...pageProps} />
            {!cookie && <CookieBanner onAllow={onAllow} />}
            <Analytics />
            <ToastContainer />
          </ChakraProvider>
        </CacheProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
