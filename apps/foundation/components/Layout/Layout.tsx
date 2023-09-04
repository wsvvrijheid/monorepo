import { FC, PropsWithChildren, useEffect } from 'react'

import { NextSeoProps } from 'next-seo'
import { useCookie } from 'react-use'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'
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
  const { checkAuth } = useAuthContext()

  const [cookie, updateCookie] = useCookie('wsvvrijheid-cookiesAccepted')

  const onAllow = () => {
    updateCookie('true')
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <>
      <AppLayout
        seo={seo}
        logo={`/images/wsvvrijheid-logo.svg`}
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
          about: 'wsvvrijheid',
          socialItems: socialLinks.wsvvrijheid,
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
