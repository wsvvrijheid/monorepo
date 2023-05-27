import { HeaderMenu, HeaderNavItemProps } from '../Header/types'
import { SocialItem } from '../SocialButtons'

export type FooterProps = {
  animated?: boolean
  name: string
  menu: HeaderMenu
  about: 'wsvvrijheid' | 'kunsthalte' | 'samenvvv'
  logo: string
  socialItems: SocialItem[]
}

export type FooterNavProps = Pick<FooterProps, 'menu'>

export type FooterNavItemProps = HeaderNavItemProps
