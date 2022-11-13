import { useEffect, useState } from 'react'

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { defaultSeo, themes } from '@wsvvrijheid/config'
import { checkAuth, store } from '@wsvvrijheid/store'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'

import i18nConfig from '../next-i18next.config'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const { locale } = useRouter()

  const router = useRouter()

  useEffect(() => {
    store
      .dispatch(checkAuth())
      .unwrap()
      .then(res => {
        if (router.asPath !== '/login' && !res.isLoggedIn) {
          router.push('/login')
        }
      })
  }, [router])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <ChakraProvider theme={themes.samenvvv}>
            <Head>
              <link rel="icon" type="image/x-icon" href="/favicon.ico" />
              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/favicon-16x16.png"
              />
              <link rel="manifest" href="/site.webmanifest" />
            </Head>
            <DefaultSeo {...defaultSeo.admin[locale]} />
            <Component {...pageProps} />
            <ToastContainer />
          </ChakraProvider>
        </ReduxProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
