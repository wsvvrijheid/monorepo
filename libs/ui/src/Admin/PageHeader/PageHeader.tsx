import { FC, ReactNode, useState } from 'react'

import {
  ButtonGroup,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Menu,
  MenuButton,
  MenuList,
  Text,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { HiOutlineFilter, HiOutlineSearch } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { LanguageSwitcher } from '../LanguageSwitcher'

interface PageHeaderProps {
  buttons?: ReactNode
  defaultLocale: StrapiLocale
  filterMenu?: ReactNode
  sortMenu?: ReactNode
  title: string
  onLanguageSwitch: (slug: StrapiLocale) => void
  onSearch: (value: string) => void
}

export const PageHeader: FC<PageHeaderProps> = ({
  buttons,
  defaultLocale,
  filterMenu,
  sortMenu,
  title,
  onLanguageSwitch,
  onSearch,
}) => {
  const [search, setSearch] = useState('')

  return (
    <HStack justify="space-between" alignItems={'center'} h={'60px'}>
      <Text color="primary.400" fontWeight={'bold'}>
        {title}
      </Text>
      <HStack align="center">
        {onSearch && (
          <InputGroup role="group">
            <InputLeftElement>
              <HiOutlineSearch />
            </InputLeftElement>
            <Input
              placeholder={'Search'}
              w={'400px'}
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
        <LanguageSwitcher
          defaultLocale={defaultLocale}
          onLanguageSwitch={onLanguageSwitch}
        />

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

        {buttons && <ButtonGroup>{buttons}</ButtonGroup>}
      </HStack>
    </HStack>
  )
}
