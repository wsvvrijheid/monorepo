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
        logo={'/images/kunsthalte-logo.svg'}
        headerProps={{
          headerMenu: menus.kunsthalte.headerMenu,
          animated: false,
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
    </>
  )
}
