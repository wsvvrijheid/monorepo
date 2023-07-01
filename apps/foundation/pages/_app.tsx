import { FC, useState } from 'react'

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

import { defaultSeo, themes } from '@wsvvrijheid/config'
import { i18nConfig } from '@wsvvrijheid/config'
import { AuthProvider } from '@wsvvrijheid/context'
import { StrapiLocale } from '@wsvvrijheid/types'

const { ToastContainer } = createStandaloneToast()

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient())
  const { locale } = useRouter()

  return (
    <AuthProvider initialState={pageProps.authState}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={themes.wsvvrijheid}>
            <DefaultSeo {...defaultSeo.wsvvrijheid[locale as StrapiLocale]} />
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
