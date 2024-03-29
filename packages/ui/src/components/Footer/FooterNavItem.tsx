import { FC } from 'react'

import { useRouter } from 'next/router'

import { FooterNavItemProps } from './types'
import { Navigate } from '../Navigate'

export const FooterNavItem: FC<FooterNavItemProps> = ({ item }) => {
  const { locale } = useRouter()
  const isExternal = item.link?.startsWith('http')

  return (
    <Navigate
      color="primary.100"
      _hover={{
        color: 'primary.50',
      }}
      {...(isExternal && { isExternal, target: '_blank' })}
      key={item.link}
      href={item.link as string}
    >
      {item[locale || 'en']}
    </Navigate>
  )
}
