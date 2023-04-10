import { FC, ReactNode } from 'react'

import {
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Spacer,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

import { SearchForm } from '../../components'

export type PageHeaderProps = {
  filterMenu?: ReactNode
  sortMenu?: ReactNode
  onSearch?: (value: string | null) => number | void
  children?: ReactNode
  filterMenuCloseOnSelect?: boolean
  searchPlaceHolder?: string
}

export const PageHeader: FC<PageHeaderProps> = ({
  filterMenu,
  sortMenu,
  onSearch,
  children,
  filterMenuCloseOnSelect,
  searchPlaceHolder,
}) => {
  const { t } = useTranslation()

  const hasChildren =
    Boolean(children) ||
    Boolean(filterMenu) ||
    Boolean(sortMenu) ||
    typeof onSearch === 'function'

  return (
    <HStack
      align="center"
      bg="white"
      px={4}
      py={hasChildren ? 2 : 0}
      shadow="base"
    >
      {typeof onSearch === 'function' ? (
        <SearchForm
          onSearch={onSearch}
          variant="flushed"
          placeholder={searchPlaceHolder || (t('search') as string)}
        />
      ) : (
        <Spacer />
      )}

      {filterMenu && (
        <Menu closeOnSelect={filterMenuCloseOnSelect}>
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
      {children}
    </HStack>
  )
}
