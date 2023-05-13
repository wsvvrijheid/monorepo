import { FC, PropsWithChildren } from 'react'

import { NextSeoProps } from 'next-seo'

import { ASSETS_URL, menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'

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
  return (
    <AppLayout
      seo={seo}
      logo={`${ASSETS_URL}/uploads/kunsthalte_4eec0eea66.svg`}
      headerProps={{
        headerMenu: menus.kunsthalte.headerMenu,
        animated: false,
        profileMenu: {
          ...menus.kunsthalte.profileMenu,
        },
        isDark,
        hasScroll,
      }}
      footerProps={{
        name: 'Kunsthalte',
        animated: false,
        menu: menus.kunsthalte.footerMenu,
        about: 'kunsthalte',
        socialItems: socialLinks.kunsthalte,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  )
}
