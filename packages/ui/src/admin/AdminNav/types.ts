import { ReactNode } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { AdminRoute } from '@wsvvrijheid/config'

export type NavItemWithSubmenuProps = {
  label: string
  link: AdminRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemWithoutSubmenuProps = {
  label: string
  link?: AdminRoute
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemProps = NavItemWithSubmenuProps | NavItemWithoutSubmenuProps

export type AdminNavItemProps = {
  label: string
  link?: AdminRoute
  submenu?: AdminNavItemProps[]
  icon: JSX.Element
  expanded?: boolean
} & ButtonProps

export type AdminNAvProps = {
  expanded?: boolean
}

export type NavLinkProps = ButtonProps & {
  href?: AdminRoute
  children?: ReactNode
}
