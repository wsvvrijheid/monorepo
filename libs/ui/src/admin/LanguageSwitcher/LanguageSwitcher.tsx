import { useCallback } from 'react'

import {
  Box,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { Flags } from '../../components'

export const LanguageSwitcher = () => {
  const router = useRouter()

  const CurrentFlag = Flags[router.locale as StrapiLocale]

  const LanguageNames: Record<StrapiLocale, string> = {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  }

  const switchLocale = useCallback(
    (locale: StrapiLocale) => {
      router.push(router.asPath, router.asPath, {
        locale,
      })
    },
    [router],
  )

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
          .filter(([language]) => language !== (router.locale as StrapiLocale))
          .map(([language, Flag]) => (
            <MenuItem
              key={language}
              onClick={() => switchLocale(language as StrapiLocale)}
              icon={<Box as={Flag} boxSize={8} />}
            >
              {LanguageNames[language as StrapiLocale]}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}
