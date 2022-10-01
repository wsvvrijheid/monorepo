import { FC, PropsWithChildren } from 'react'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'
import { useAuthSelector } from '@wsvvrijheid/utils'
import axios from 'axios'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

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
  const auth = useAuthSelector()
  const router = useRouter()

  const logOut = () => {
    axios.post('/api/auth/logout').then(() => {
      router.push('/login')
    })
  }

  return (
    <AppLayout
      seo={seo}
      logo="https://wsvvrijheid.nl/images/logo.svg"
      headerProps={{
        headerMenu: menus.wsvvrijheid.headerMenu,
        profileMenu: {
          ...menus.wsvvrijheid.profileMenu,
          isLoggedIn: auth?.isLoggedIn,
          userAvatar: auth?.user?.avatar,
          username: auth?.user?.username,
          logout: {
            label: 'Logout',
            onClick: logOut,
          },
        },
        isDark,
        hasScroll,
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
