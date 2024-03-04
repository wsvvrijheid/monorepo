import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
import { Layout as AppLayout, UserFeedback } from '@wsvvrijheid/ui'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  isLoading?: boolean
  hasScroll?: boolean
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  isDark,
  isLoading,
  hasScroll,
  seo,
}) => {
  const { checkAuth } = useAuthContext()

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <AppLayout
        seo={seo}
        logo={'/images/trend-rights-logo.svg'}
        headerProps={{
          headerMenu: menus.trendRights.headerMenu,
          animated: false,
          isDark,
          hasScroll,
        }}
        footerProps={{
          name: 'trend-rights',
          animated: false,
          menu: menus.trendRights.footerMenu,
          about: 'trend-rights',
          socialItems: socialLinks.trendRights,
        }}
        isDark={isDark}
        isLoading={isLoading}
      >
        {children}
      </AppLayout>
      <UserFeedback />
      {/* <PlusButton /> */}
    </>
  )
}
