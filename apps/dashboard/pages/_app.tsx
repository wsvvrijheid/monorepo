import { FC, useState } from 'react'

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
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'

import { defaultSeo, i18nConfig, themes } from '@wsvvrijheid/config'
import { AuthProvider } from '@wsvvrijheid/context'

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

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  // TODO: Remove this

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

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={extendTheme(theme)}>
          <AuthProvider initialState={pageProps.authState}>
            <DefaultSeo {...defaultSeo.admin[locale]} />
            <Component {...pageProps} />
            <Analytics />
            <ToastContainer />
          </AuthProvider>
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
