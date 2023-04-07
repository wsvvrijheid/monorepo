import { FC } from 'react'

import { Button, Stack } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { HeaderMobileNavItem } from './HeaderMobileNavItem'
import { HeaderMobileNavProps } from './types'
import { Navigate } from '../Navigate'

export const HeaderMobileNav: FC<HeaderMobileNavProps> = ({ headerMenu }) => {
  const { t } = useTranslation()

  return (
    <Stack spacing={0}>
      {headerMenu.map((item, i) => {
        return <HeaderMobileNavItem key={i} item={item} />
      })}
      <Navigate href={'/donation'}>
        <Button w={'full'}>{t('donation.title')}</Button>
      </Navigate>
    </Stack>
  )
}
