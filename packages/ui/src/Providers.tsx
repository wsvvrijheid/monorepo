import { FC, ReactNode, useState } from 'react'

import { HydrationOverlay } from '@builder.io/react-hydration-overlay'
import { ChakraProvider, createStandaloneToast } from '@chakra-ui/react'
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { useCookie } from 'react-use'

import { defaultSeo, themes } from '@wsvvrijheid/config'
import { AuthProvider } from '@wsvvrijheid/context'
import { AppSlug } from '@wsvvrijheid/types'

import { CookieBanner } from './components'

type ProvidersProps = {
  dehydratedState: unknown
  appSlug: AppSlug
  children: ReactNode
}

const { ToastContainer } = createStandaloneToast()

export const Providers: FC<ProvidersProps> = ({
  dehydratedState,
  appSlug,
  children,
}) => {
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
    <HydrationOverlay>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          <AuthProvider>
            <ChakraProvider theme={themes[appSlug]}>
              <DefaultSeo {...defaultSeo[appSlug][locale]} />
              {children}
              {!cookie && <CookieBanner onAllow={onAllow} />}
              <ToastContainer />
            </ChakraProvider>
          </AuthProvider>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </HydrationOverlay>
  )
}
