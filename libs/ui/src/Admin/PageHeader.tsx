import { FC, useState } from 'react'

import { SearchIcon } from '@chakra-ui/icons'
import {
  Flex,
  Avatar,
  Input,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  ButtonGroup,
} from '@chakra-ui/react'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

interface PageHeaderProps {
  onSearch: (item: string) => void
  title: string
  images: { slug: string; url: string }[]
  createNew: (name: string) => void
  onFilter: (filter: string) => void
  onSort: (sort: string) => void
  onLanguageChange: (slug: string) => void
  filterOptions: Array<string>
  sortOptions: Array<string>
  buttons: Array<string>
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  onSearch,
  images,
  createNew,
  onFilter,
  onSort,
  onLanguageChange,
  filterOptions,
  sortOptions,
  buttons,
}) => {
  const [search, setSearch] = useState('')
  const [flags, setFlags] = useState('tr')

  return (
    <Flex
      justifyContent={{ base: 'space-between' }}
      alignItems={'center'}
      padding={1}
      h={'60px'}
      borderRadius={'10px'}
    >
      <Text color="primary.400" w={'40%'} fontWeight={'bold'}>
        {title}
      </Text>
      <Flex
        w={{ base: '60%' }}
        justifyContent={{ base: 'end' }}
        alignItems={'center'}
      >
        <InputGroup
          border={{ base: `1px solid lightgray` }}
          borderRadius={'10px'}
        >
          <InputLeftElement>
            <SearchIcon />
          </InputLeftElement>
          <Input
            placeholder={'Search'}
            border={'none'}
            w={'400px'}
            value={search}
            onChange={e => setSearch(e.target?.value)}
            onKeyDown={e => (e.key === 'Enter' ? onSearch(search) : null)}
          />
        </InputGroup>
        <Menu>
          <MenuButton>
            <Avatar
              src={
                images.filter(image => Object.values(image)[0] === flags)[0].url
              }
              h={'40px'}
              w={'40px'}
              borderRadius={'50%'}
              border={'1px solid lightgray'}
              marginLeft={5}
              cursor={'pointer'}
            />
          </MenuButton>
          <MenuList>
            {images
              .filter(image => Object.values(image)[0] !== flags)
              .map(image => (
                <MenuItem
                  onClick={() => {
                    setFlags(image.slug)
                    onLanguageChange(image.slug)
                  }}
                >
                  <Avatar
                    src={image.url}
                    h={'40px'}
                    w={'40px'}
                    borderRadius={'50%'}
                    border={'1px solid lightgray'}
                    marginLeft={5}
                    cursor={'pointer'}
                    mt={1}
                    mb={1}
                  />
                  <Text ml={3}>
                    {image.slug === 'tr'
                      ? 'Türkçe'
                      : image.slug === 'en'
                      ? 'English'
                      : 'Nederlands'}
                  </Text>
                </MenuItem>
              ))}
          </MenuList>
        </Menu>
        <Flex
          marginLeft={5}
          border={'1px solid lightgray'}
          padding={3}
          borderRadius={'10px'}
        >
          <Menu>
            <MenuButton>
              <HiOutlineFilter />
            </MenuButton>
            <MenuList mt={2} ml={-3}>
              {filterOptions?.map(option => (
                <MenuItem
                  value={option}
                  onClick={e => onFilter(e.target.value)}
                >
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
        <Flex
          marginLeft={5}
          border={'1px solid lightgray'}
          padding={3}
          borderRadius={'10px'}
        >
          <Menu>
            <MenuButton>
              <VscListFilter />
            </MenuButton>
            <MenuList mt={2} ml={-3}>
              {sortOptions?.map(option => (
                <MenuItem value={option} onClick={e => onSort(e.target.value)}>
                  {option}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
        {buttons && (
          <ButtonGroup>
            {buttons.map(button => (
              <Button
                colorScheme={'primary'}
                color={'white'}
                marginLeft={5}
                onClick={() => createNew(button)}
              >
                {button}
              </Button>
            ))}
          </ButtonGroup>
        )}
      </Flex>
    </Flex>
  )
}
