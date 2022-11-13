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
import { pageview } from '@wsvvrijheid/utils'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/url/dist/style.css'
import '@uppy/image-editor/dist/style.css'

import i18nConfig from '../next-i18next.config'

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
        <ReduxProvider store={store}>
          <ChakraProvider theme={themes.wsvvrijheid}>
            <DefaultSeo {...defaultSeo.wsvvrijheid[router.locale]} />
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
