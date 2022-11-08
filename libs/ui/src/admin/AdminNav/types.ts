import { ButtonProps } from '@chakra-ui/react'

export type NavItemProps = {
  [x: string]: any
  label: string
  link: string
  icon: JSX.Element
  submenu?: NavItemProps[]
}
export type AdminNavItemProps = {
  label: string
  link?: string
  submenu?: NavItemProps[]
  icon: JSX.Element
  expanded?: boolean
} & ButtonProps
