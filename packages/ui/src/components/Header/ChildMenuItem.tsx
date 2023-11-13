import { FC } from 'react'

import { useRouter } from 'next/router'

import { MenuTypeItemProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'

export const ChildMenuItem: FC<MenuTypeItemProps> = ({ item, isDark }) => {
  const { asPath, locale } = useRouter()
  const isScrolled = useScroll()
  const isActive = item.link !== '/' && asPath.includes(item.link as string)

  return (
    <Navigate
      href={item.link as string}
      fontWeight={600}
      p={2}
      color={
        isActive
          ? isDark
            ? 'primary.200'
            : 'primary.500'
          : !isScrolled && isDark
            ? 'white'
            : 'gray.700'
      }
      _hover={{
        color: !isScrolled && isDark ? 'whiteAlpha.800' : 'primary.500',
      }}
    >
      {item[locale || 'en']}
    </Navigate>
  )
}
