import { FC, PropsWithChildren } from 'react'

import { menus, socialLinks } from '@wsvvrijheid/config'
import { Layout as AppLayout } from '@wsvvrijheid/ui'
import {
  destroyAuth,
  useAppDispatch,
  useAuthSelector,
} from '@wsvvrijheid/utils'
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

  const dispatch = useAppDispatch()

  const logOut = async () => {
    await dispatch(destroyAuth()).unwrap()

    router.push('/login')
  }

  return (
    <AppLayout
      seo={seo}
      logo="https://kunsthalte.com/images/kunsthalte.svg"
      headerProps={{
        headerMenu: menus.kunsthalte.headerMenu,
        profileMenu: {
          ...menus.kunsthalte.profileMenu,
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
        menu: menus.kunsthalte.footerMenu,
        about: 'About',
        socialItems: socialLinks.kunsthalte,
      }}
      isDark={isDark}
      isLoading={isLoading}
    >
      {children}
    </AppLayout>
  )
}
