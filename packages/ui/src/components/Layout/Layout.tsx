import { FC, ReactNode } from 'react'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'
import { NextSeo, NextSeoProps } from 'next-seo'

import { Footer } from '../Footer/Footer'
import { FooterProps } from '../Footer/types'
import { Header } from '../Header/Header'
import { HeaderProps } from '../Header/types'

export interface LayoutProps {
  children: ReactNode
  footerProps: Omit<FooterProps, 'logo'>
  hasProfile?: boolean
  headerProps: Omit<HeaderProps, 'logo'>
  isDark?: boolean
  isLoading?: boolean
  logo: string
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  footerProps,
  hasProfile,
  headerProps,
  isDark,
  isLoading = false,
  logo,
  seo,
}) => {
  const minH = isDark
    ? 'calc(100vh - 300px)'
    : { base: 'calc(100vh - 64px)', lg: 'calc(100vh - 100px)' }

  return (
    <>
      {seo && <NextSeo {...seo} />}
      <Flex flexDir="column" minHeight="100vh" overflowX="hidden">
        <Header
          {...headerProps}
          isDark={isDark}
          hasProfile={hasProfile}
          logo={logo}
        />
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
