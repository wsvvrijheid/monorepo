import { FC, PropsWithChildren } from 'react'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'
import { useTranslation } from 'next-i18next'
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
  const { t } = useTranslation('common')

  return (
    <AppLayout
      seo={seo}
      logo="https://api.samenvvv.nl/uploads/kunsthalte_logo_6e8dc3b222.svg"
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
