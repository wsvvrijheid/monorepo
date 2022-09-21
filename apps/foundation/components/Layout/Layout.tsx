import { FC, PropsWithChildren } from 'react'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'
import { NextSeoProps } from 'next-seo'

interface LayoutProps extends PropsWithChildren {
  isDark?: boolean
  isLoading?: boolean
  hasScroll?: boolean
  isLoggedIn?: boolean
  userAvatar?: string
  username?: string
  seo: NextSeoProps
}

export const Layout: FC<LayoutProps> = ({
  children,
  isDark,
  isLoading,
  hasScroll,
  seo,
  isLoggedIn,
  userAvatar,
  username,
}) => {
  return (
    <AppLayout
      seo={seo}
      logo="https://wsvvrijheid.nl/images/logo.svg"
      headerProps={{
        headerMenu: menus.wsvvrijheid.headerMenu,
        profileMenu: {
          ...menus.wsvvrijheid.profileMenu,
          isLoggedIn,
          userAvatar,
          username,
        },
        isDark,
        hasScroll,
        isLoggedIn,
      }}
      footerProps={{
        menu: menus.wsvvrijheid.footerMenu,
        about: 'About',
        socialItems: socialLinks.wsvvrijheid,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  )
}
