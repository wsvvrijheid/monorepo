import React, { FC } from 'react'

import { Badge, BadgeProps, HStack } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'

type LocaleBadgesProps = {
  locales: StrapiLocale[]
} & BadgeProps

export const LocaleBadges: FC<LocaleBadgesProps> = ({ locales, ...rest }) => {
  const colorScheme = {
    en: 'purple',
    nl: 'orange',
    tr: 'cyan',
  }

  return (
    <HStack spacing={1}>
      {locales.map(locale => (
        <Badge variant="outline" {...rest} colorScheme={colorScheme[locale]}>
          {locale}
        </Badge>
      ))}
    </HStack>
  )
}
