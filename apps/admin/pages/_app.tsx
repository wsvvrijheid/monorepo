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
import { useRouter } from 'next/router'
import { Provider as ReduxProvider } from 'react-redux'

import i18nConfig from '../next-i18next.config'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/url/dist/style.css'
import 'react-medium-image-zoom/dist/styles.css'

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const { locale } = useRouter()

  useEffect(() => {
    store.dispatch(checkAuth())
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ReduxProvider store={store}>
          <ChakraProvider theme={themes.admin}>
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
