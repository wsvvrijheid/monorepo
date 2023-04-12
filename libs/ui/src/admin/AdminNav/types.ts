import { ReactNode } from 'react'

import { ButtonProps } from '@chakra-ui/react'

import { AdminRoutes } from '@wsvvrijheid/config'
import { SessionUser } from '@wsvvrijheid/types'

export type NavItemWithSubmenuProps = {
  label: string
  link: AdminRoutes
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemWithoutSubmenuProps = {
  label: string
  link?: AdminRoutes
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemProps =
  | NavItemWithSubmenuProps
  | (NavItemWithoutSubmenuProps & { visible: boolean })

export type AdminNavItemProps = {
  label: string
  link?: AdminRoutes
  submenu?: NavItemProps[]
  icon: JSX.Element
  visible: boolean
  expanded?: boolean
} & ButtonProps

export type AdminNAvProps = {
  user: SessionUser
  expanded?: boolean
}

export type NavLinkProps = {
  href?: AdminRoutes
  children: ReactNode
}
