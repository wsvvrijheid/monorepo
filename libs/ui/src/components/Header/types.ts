import { ResponsiveValue } from '@chakra-ui/react'
import { MenuType } from '@wsvvrijheid/types'

export type HeaderMenu = Array<MenuType>

export type ProfileMenuProps = {
  menu: Array<{ label: string; link: string; icon?: JSX.Element }>
} & Pick<HeaderProps, 'isDark'>

export interface HeaderProps {
  animated?: boolean
  isDark?: boolean
  hasScroll?: boolean
  logo: string
  headerMenu: HeaderMenu
  profileMenu?: ProfileMenuProps
  isLoggedIn?: boolean
}

export interface HeaderNavItemProps {
  item: MenuType
  isDark?: boolean
}

export type HeaderMobileNavItemProps = HeaderNavItemProps

export interface MenuTypeItemProps {
  item: MenuType
  isDark?: boolean
}

export interface HeaderNavProps {
  direction: ResponsiveValue<
    'row' | 'column' | 'row-reverse' | 'column-reverse'
  >
  menu: HeaderMenu
  isDark?: boolean
}

export type HeaderMobileProps = HeaderProps

export type HeaderMobileNavProps = Pick<
  HeaderProps,
  'headerMenu' | 'profileMenu'
>
