import { ResponsiveValue } from '@chakra-ui/react'

import { MenuType } from '@fc/types'

export type HeaderMenu = Array<MenuType>

export type ProfileMenuProps = Pick<HeaderProps, 'isDark' | 'isLoggedIn'>

export interface HeaderProps {
  hasProfile?: boolean
  headerMenu: HeaderMenu
  isDark?: boolean
  isLoggedIn?: boolean
  logo: string
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

export type HeaderMobileNavProps = Pick<HeaderProps, 'headerMenu'>
