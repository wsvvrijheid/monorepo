import { useEffect, useState } from 'react'

import {
  ChakraProvider,
  createStandaloneToast,
  extendTheme,
} from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Analytics } from '@vercel/analytics/react'
import { merge } from 'lodash'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'

import { defaultSeo, themes } from '@wsvvrijheid/config'
import { AuthProvider, useAuth } from '@wsvvrijheid/context'

import i18nConfig from '../next-i18next.config'

import '@splidejs/react-splide/css'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import '@uppy/image-editor/dist/style.css'
import '@uppy/url/dist/style.css'
import 'react-markdown-editor-lite/lib/index.css'
import 'react-medium-image-zoom/dist/styles.css'

const theme = merge(themes.admin, {
  styles: {
    global: {
      body: {
        overflow: 'hidden',
      },
      '#__next': {
        h: '100vh',
        overflow: 'hidden',
      },
    },
  },
})

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
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
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <AuthProvider initialState={pageProps.authState}>
          <ChakraProvider theme={extendTheme(theme)}>
            <DefaultSeo {...defaultSeo.admin[locale]} />
            <Component {...pageProps} />
            <Analytics />
            <ToastContainer />
          </ChakraProvider>
        </AuthProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
