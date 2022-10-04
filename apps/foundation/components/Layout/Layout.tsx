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
      logo="https://wsvvrijheid.nl/images/logo.svg"
      headerProps={{
        headerMenu: menus.wsvvrijheid.headerMenu,
        profileMenu: {
          ...menus.wsvvrijheid.profileMenu,
        },
        isDark,
        hasScroll,
      }}
      footerProps={{
        menu: menus.wsvvrijheid.footerMenu,
        name: 'Wsvvrijheid',
        about: t('footer-about.wsvvrijheid'),
        socialItems: socialLinks.wsvvrijheid,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  )
}
