import { ButtonProps } from '@chakra-ui/react'

export type NavItemWithSubmenuProps = {
  label: string
  link: string
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemWithoutSubmenuProps = {
  label: string
  link?: string
  icon: JSX.Element
  submenu?: NavItemWithSubmenuProps[]
}

export type NavItemProps =
  | NavItemWithSubmenuProps
  | (NavItemWithoutSubmenuProps & { visible?: boolean })

export type AdminNavItemProps = {
  label: string
  link?: string
  submenu?: NavItemProps[]
  icon: JSX.Element
  visible?: boolean
  expanded?: boolean
} & ButtonProps
