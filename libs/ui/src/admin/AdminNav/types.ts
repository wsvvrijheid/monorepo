import { ButtonProps } from '@chakra-ui/react'
import { IconType } from 'react-icons'

export type NavItemProps = [{ label: string; link: string; icon: IconType }]
export type AdminNavItemProps = {
  label: string
  link: string
  submenu?: NavItemProps[]
  icon: IconType
} & ButtonProps
