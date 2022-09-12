import { ButtonProps } from '@chakra-ui/react'

export type NavItemProps = { label: string; link: string; icon: JSX.Element }
export type AdminNavItemProps = {
  label: string
  link?: string
  submenu?: NavItemProps[]
  icon: JSX.Element
  expanded?: boolean
} & ButtonProps
