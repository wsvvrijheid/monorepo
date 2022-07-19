import { FC, ReactNode } from 'react'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { Footer } from '../Footer/Footer'
import { FooterProps } from '../Footer/types'
import { Header } from '../Header/Header'
import { HeaderProps } from '../Header/types'

interface LayoutProps {
  seo: NextSeoProps
  isLoading?: boolean
  isDark?: boolean
  children: ReactNode
  headerProps: Omit<HeaderProps, 'logo'>
  footerProps: Omit<FooterProps, 'logo'>
  logo: string
}

export const Layout: FC<LayoutProps> = ({
  children,
  seo,
  isLoading = false,
  isDark,
  headerProps,
  footerProps,
  logo,
}) => {
  const minH = isDark
    ? 'calc(100vh - 300px)'
    : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }

  return (
    <>
      {seo && <NextSeo {...seo} />}
      <Flex flexDir="column" minHeight="100vh" overflowX="hidden">
        {<Header isDark={isDark} {...headerProps} logo={logo} />}
        {isLoading ? (
          <Center minH={minH}>
            <Spinner colorScheme="red" />
          </Center>
        ) : (
          <Box minH={minH}>{children}</Box>
        )}
        <Footer {...footerProps} logo={logo} />
      </Flex>
    </>
  )
}
