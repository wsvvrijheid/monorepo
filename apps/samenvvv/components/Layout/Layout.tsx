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
  const [cookie, updateCookie] = useCookie('samenvvv-cookiesAccepted')

  const onAllow = () => {
    updateCookie('true')
  }

  return (
    <>
      <AppLayout
        seo={seo}
        logo={'/images/samen-logo.svg'}
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
      <UserFeedback />
      {!cookie && <CookieBanner onAllow={onAllow} />}
      {/* <PlusButton /> */}
    </>
  )
}
