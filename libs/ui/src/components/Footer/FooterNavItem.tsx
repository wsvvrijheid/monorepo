import { FC } from 'react'

import { useRouter } from 'next/router'

import { StrapiLocale } from '@wsvvrijheid/types'

import { FooterNavItemProps } from './types'
import { Navigate } from '../Navigate'

export const FooterNavItem: FC<FooterNavItemProps> = ({ item }) => {
  const { locale } = useRouter()

  return (
    <Navigate
      color="primary.100"
      _hover={{
        color: 'primary.50',
      }}
      key={item.link}
      href={item.link as string}
    >
      {item[(locale as StrapiLocale) || 'en']}
    </Navigate>
  )
}
