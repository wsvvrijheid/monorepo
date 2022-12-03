import { FC, PropsWithChildren } from 'react'

import { API_URL, menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'
import { NextSeoProps } from 'next-seo'

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
      logo={`${API_URL}/uploads/samen_40a957fb1c.svg`}
      headerProps={{
        headerMenu: menus.samenvvv.headerMenu,
        animated: false,
        isDark,
        hasScroll,
      }}
      footerProps={{
        name: 'samenvvv',
        animated: false,
        menu: menus.samenvvv.footerMenu,
        about: 'samenvvv',
        socialItems: socialLinks.samenvvv,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  )
}
