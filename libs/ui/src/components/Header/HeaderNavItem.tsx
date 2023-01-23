import { FC } from 'react'

import {
  Box,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { HeaderNavItemProps, MenuTypeItemProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'

export const ChildMenuItem: FC<MenuTypeItemProps> = ({ item, isDark }) => {
  const { asPath, locale } = useRouter()
  const isScrolled = useScroll()

  return (
    <Navigate
      href={item.link as string}
      fontWeight="semibold"
      p={2}
      color={
        item.link !== '/' && asPath.includes(item.link as string)
          ? 'primary.500'
          : !isScrolled && isDark
          ? 'white'
          : 'gray.700'
      }
      _hover={{
        color: !isScrolled && isDark ? 'whiteAlpha.800' : 'primary.500',
      }}
    >
      {item[(locale as StrapiLocale) || 'en']}
    </Navigate>
  )
}

export const ParentMenuItem: FC<MenuTypeItemProps> = ({ item, isDark }) => {
  return (
    <Popover trigger="hover" arrowSize={16}>
      <PopoverTrigger>
        <Box p={2} w="max-content">
          <ChildMenuItem item={item} isDark={isDark} />
        </Box>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverArrow />
        <PopoverBody>
          <Stack>
            {item.children?.map(item => (
              <Box py={1} key={item.link}>
                <ChildMenuItem item={item} isDark={false} />
              </Box>
            ))}
          </Stack>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}

export const HeaderNavItem: FC<HeaderNavItemProps> = ({ item, isDark }) => {
  const isParentLink = !!item.children

  if (isParentLink) {
    return <ParentMenuItem item={item} isDark={isDark} />
  }

  return <ChildMenuItem item={item} isDark={isDark} />
}
