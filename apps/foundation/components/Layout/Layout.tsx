import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'

import { menus, socialLinks } from '@fc/config'
import { useAuthContext } from '@fc/context'
import { Layout as AppLayout, UserFeedback } from '@fc/ui'

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
        headerProps={{
          headerMenu: menus.foundation.headerMenu,
          isDark,
          hasScroll,
          logo: `/images/foundation-logo.svg`,
        }}
        footerProps={{
          menu: menus.foundation.footerMenu,
          name: 'Freedom Combination',
          about: 'foundation',
          socialItems: socialLinks.foundation,
          logo: `/images/foundation-logo-light.svg`,
        }}
        isDark={isDark}
        isLoading={isLoading}
        hasProfile
      >
        {children}
      </AppLayout>
      <UserFeedback />
    </>
  )
}
