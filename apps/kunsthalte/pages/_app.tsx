import { useEffect, useState } from 'react'

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import { DefaultSeo } from 'next-seo'
import { Provider as ReduxProvider } from 'react-redux'

import { defaultSeo, themes } from '@wsvvrijheid/config'
import { NX_KUNSTHALTE_RECAPTCHA_SITE_KEY } from '@wsvvrijheid/secrets'
import { checkAuth, store } from '@wsvvrijheid/store'
import { pageview } from '@wsvvrijheid/utils'

import i18nConfig from '../next-i18next.config'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/url/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import 'react-medium-image-zoom/dist/styles.css'

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()

  useEffect(() => {
    store.dispatch(checkAuth())
  }, [])

  useEffect(() => {
    const handleRouteChange = url => pageview(url)

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => router.events.off('routeChangeComplete', handleRouteChange)
  }, [router.events])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReCaptchaProvider
          useEnterprise
          reCaptchaKey={NX_KUNSTHALTE_RECAPTCHA_SITE_KEY}
        >
          <ReduxProvider store={store}>
            <ChakraProvider theme={themes.kunsthalte}>
              <DefaultSeo {...defaultSeo.kunsthalte[router.locale]} />
              <Component {...pageProps} />
              <Analytics />
              <ToastContainer />
            </ChakraProvider>
          </ReduxProvider>
        </ReCaptchaProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
