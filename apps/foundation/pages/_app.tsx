import { useState } from 'react'

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
import { DefaultSeo } from 'next-seo'

import { defaultSeo, themes } from '@wsvvrijheid/config'
import { AuthProvider } from '@wsvvrijheid/context'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/url/dist/style.css'
import 'react-medium-image-zoom/dist/styles.css'

import i18nConfig from '../next-i18next.config'

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const router = useRouter()

  return (
    <AuthProvider initialState={pageProps.authState}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={themes.wsvvrijheid}>
            <DefaultSeo {...defaultSeo.wsvvrijheid[router.locale]} />
            <Component {...pageProps} />
            <Analytics />
            <ToastContainer />
          </ChakraProvider>
        </Hydrate>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
