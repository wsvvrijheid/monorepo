import { FC, useEffect, useState } from 'react'

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  usePrevious,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'

import { Flags } from '../../components'

export type LanguageSwitcherProps = {
  onLanguageSwitch: (locale: StrapiLocale) => void
  defaultLocale: StrapiLocale
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  defaultLocale = 'tr',
  onLanguageSwitch,
}) => {
  const [locale, setLocale] = useState(defaultLocale)
  const previousLocale = usePrevious(locale)

  const CurrentFlag = Flags[locale]
  const LanguageNames: Record<StrapiLocale, string> = {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  }

  useEffect(() => {
    if (previousLocale && previousLocale !== locale) {
      onLanguageSwitch(locale)
    }
  }, [locale, onLanguageSwitch, previousLocale])

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        variant="ghost"
        rounded="full"
        icon={<Box boxSize={8} as={CurrentFlag} />}
      />
      <MenuList>
        {Object.entries(Flags)
          .filter(([language]) => language !== locale)
          .map(([language, Flag]) => (
            <MenuItem
              key={language}
              onClick={() => {
                setLocale(language as StrapiLocale)
              }}
              icon={<Box as={Flag} boxSize={8} />}
            >
              {LanguageNames[language as StrapiLocale]}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}
