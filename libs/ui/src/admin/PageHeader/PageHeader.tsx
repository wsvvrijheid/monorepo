import { FC, ReactNode } from 'react'

import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { SearchForm } from '../../components'
import { LanguageSwitcher } from '../LanguageSwitcher'

export type PageHeaderProps = {
  defaultLocale?: StrapiLocale
  filterMenu?: ReactNode
  sortMenu?: ReactNode
  onLanguageSwitch?: (slug: StrapiLocale) => void
  onSearch: (value: string | null) => void
}

export const PageHeader: FC<PageHeaderProps> = ({
  defaultLocale,
  filterMenu,
  sortMenu,
  onLanguageSwitch,
  onSearch,
}) => {
  return (
    <HStack align="center" bg="white" px={4} py={2}>
      {typeof onSearch === 'function' && (
        <SearchForm
          onSearch={onSearch}
          variant="flushed"
          placeholder="Search by art title or artist name"
        />
      )}
      {/* TODO locale switcher */}
      {defaultLocale && onLanguageSwitch && (
        <LanguageSwitcher
          defaultLocale={defaultLocale}
          onLanguageSwitch={onLanguageSwitch}
        />
      )}

      {filterMenu && (
        <Menu>
          <MenuButton
            aria-label="Open filter menu"
            as={IconButton}
            icon={<HiOutlineFilter />}
            variant="outline"
            rounded="full"
          />
          <MenuList>{filterMenu}</MenuList>
        </Menu>
      )}

      {sortMenu && (
        <Menu>
          <MenuButton
            aria-label="Open sort menu"
            as={IconButton}
            icon={<VscListFilter />}
            variant="outline"
            rounded="full"
          />
          <MenuList>{sortMenu}</MenuList>
        </Menu>
      )}
    </HStack>
  )
}
