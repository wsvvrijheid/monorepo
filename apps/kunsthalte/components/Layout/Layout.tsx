import { FC, PropsWithChildren } from 'react'

import { NextSeoProps } from 'next-seo'
import { useCookie } from 'react-use'

import { menus, socialLinks } from '@wsvvrijheid/config'
import {
  Layout as AppLayout,
  CookieBanner,
  UserFeedback,
} from '@wsvvrijheid/ui'

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
  const [cookie, updateCookie] = useCookie('kunsthalte-cookiesAccepted')

  const onAllow = () => {
    updateCookie('true')
  }

  return (
    <>
      <AppLayout
        seo={seo}
        logo={'/images/kunsthalte-logo.svg'}
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
      <UserFeedback />
      {!cookie && <CookieBanner onAllow={onAllow} />}
    </>
  )
}
