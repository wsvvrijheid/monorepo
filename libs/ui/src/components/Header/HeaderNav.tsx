import { FC } from 'react'

import { Stack } from '@chakra-ui/react'

import { HeaderNavItem } from './HeaderNavItem'
import { HeaderNavProps } from './types'

export const HeaderNav: FC<HeaderNavProps> = ({
  direction = 'row',
  menu,
  isDark,
}) => {
  return (
    <Stack direction={direction}>
      {menu.map((item, i) => {
        return <HeaderNavItem key={i} item={item} isDark={isDark} />
      })}
    </Stack>
  )
}
