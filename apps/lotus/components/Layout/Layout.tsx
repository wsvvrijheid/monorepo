import { FC, PropsWithChildren } from 'react'

import { Center } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'
import { useCookie } from 'react-use'

import { CookieBanner, UserFeedback } from '@wsvvrijheid/ui'

interface LayoutProps extends PropsWithChildren {
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({ children, seo }) => {
  const [cookie, updateCookie] = useCookie('lotus-cookiesAccepted')

  const onAllow = () => {
    updateCookie('true')
  }

  return (
    <>
      <NextSeo {...seo} />
      <Center minH={'100vh'} bg={'black'} color={'whiteAlpha.700'}>
        {children}
      </Center>
      <UserFeedback />
      {!cookie && <CookieBanner onAllow={onAllow} />}
    </>
  )
}
