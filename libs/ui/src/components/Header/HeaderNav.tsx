import { FC } from 'react'

import { Button, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { HeaderNavItem } from './HeaderNavItem'
import { HeaderNavProps } from './types'
import { Navigate } from '../Navigate'

export const HeaderNav: FC<HeaderNavProps> = ({
  direction = 'row',
  menu,
  isDark,
}) => {
  const { t } = useTranslation()

  return (
    <Stack direction={direction} align={'center'}>
      {menu.map((item, i) => {
        return <HeaderNavItem key={i} item={item} isDark={isDark} />
      })}
      <Navigate href={'/donation'}>
        <Button
          color={'white'}
          fontWeight={600}
          size={'sm'}
          bgGradient={'linear(to-r, cyan.400, blue.600)'}
          _hover={{
            bgGradient: 'linear(to-l, cyan.400, blue.600)',
          }}
        >
          {t('donation.title')}
        </Button>
      </Navigate>
    </Stack>
  )
}
