import { useState } from 'react'

import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { defaultSeo, themes } from '@wsvvrijheid/config'
import { appWithTranslation } from 'next-i18next'
import { DefaultSeo } from 'next-seo'
import { useRouter } from 'next/router'

import i18nConfig from '../next-i18next.config'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import '@splidejs/react-splide/css'

const { ToastContainer } = createStandaloneToast()

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient())
  const { locale } = useRouter()

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={themes.admin}>
          <DefaultSeo {...defaultSeo.admin[locale]} />
          <Component {...pageProps} />
          <ToastContainer />
        </ChakraProvider>
      </Hydrate>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
