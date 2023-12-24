import { FC } from 'react'

import { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'

import { i18nConfig } from '@wsvvrijheid/config'
import { Providers } from '@wsvvrijheid/ui'

const MyApp: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Providers appSlug="samenvvv" dehydratedState={pageProps.dehydratedState}>
      <Component {...pageProps} />
    </Providers>
  )
}

export default appWithTranslation(MyApp, i18nConfig)
