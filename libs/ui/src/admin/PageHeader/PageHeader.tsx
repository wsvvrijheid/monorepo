import { FC, ReactNode, useState } from 'react'

import {
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { LanguageSwitcher } from '../LanguageSwitcher'

export type PageHeaderProps = {
  defaultLocale?: StrapiLocale
  filterMenu?: ReactNode
  sortMenu?: ReactNode
  onLanguageSwitch?: (slug: StrapiLocale) => void
  onSearch: (value: string) => void
}

export const PageHeader: FC<PageHeaderProps> = ({
  defaultLocale,
  filterMenu,
  sortMenu,
  onLanguageSwitch,
  onSearch,
}) => {
  const [search, setSearch] = useState('')

  return (
    <HStack align="center" bg="white" px={4} py={2}>
      {onSearch && (
        <InputGroup role="group" size="lg">
          <InputLeftElement>
            <HiOutlineSearch />
          </InputLeftElement>
          <Input
            variant="flushed"
            placeholder={'Search'}
            w="full"
            value={search}
            onChange={e => setSearch(e.target?.value)}
            onKeyDown={e =>
              e.key === 'Enter' && search.length > 2 ? onSearch(search) : null
            }
          />

          <InputRightElement>
            <IconButton
              aria-label="Search"
              onClick={() => onSearch(search)}
              icon={<HiOutlineSearch />}
              display={search.length > 2 ? 'flex' : 'none'}
              colorScheme="primary"
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
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
