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
} from '@chakra-ui/react'
import { HiOutlineFilter } from 'react-icons/hi'
import { VscListFilter } from 'react-icons/vsc'

interface PageHeaderProps {
  onSearch: (item: string) => void
  title: string
  images: { slug: string; url: string }[]
  textColor: string
  backgroundColor: string
  createNew: () => void
}

export const PageHeader: FC<PageHeaderProps> = ({
  title,
  onSearch,
  images,
  textColor,
  backgroundColor,
  createNew,
}) => {
  const [search, setSearch] = useState('')
  const [focusColor, setFocusColor] = useState('lightgray')
  const [flags, setFlags] = useState('tr')

  return (
    <Flex
      justifyContent={{ base: 'space-between' }}
      alignItems={'center'}
      padding={1}
      h={{ base: '60px' }}
      backgroundColor={backgroundColor}
      borderRadius={{ base: '10px' }}
    >
      <Text color={textColor} w={{ base: '40%' }} fontWeight={'bold'}>
        {title}
      </Text>
      <Flex
        w={{ base: '60%' }}
        justifyContent={{ base: 'end' }}
        alignItems={'center'}
      >
        <Flex
          border={{ base: `1px solid ${focusColor}` }}
          alignItems={'center'}
          padding={1}
          borderRadius={'10px'}
        >
          <SearchIcon />
          <Input
            placeholder={'Search'}
            border={'none'}
            w={{ base: '400px' }}
            focusBorderColor={'none'}
            value={search}
            onChange={(e: any) => setSearch(e.target?.value)}
            onKeyDown={(e: any) =>
              e.key === 'Enter' ? onSearch(search) : null
            }
            onBlur={() => setFocusColor('lightgray')}
            onFocus={() => setFocusColor(textColor)}
          />
        </Flex>
        <Menu>
          <MenuButton>
            <Avatar
              src={
                images.filter(image => Object.values(image)[0] === flags)[0].url
              }
              h={{ base: '40px' }}
              w={{ base: '40px' }}
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
                  }}
                >
                  <Avatar
                    src={image.url}
                    h={{ base: '40px' }}
                    w={{ base: '40px' }}
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
              <MenuItem>Filter by Date</MenuItem>
              <MenuItem>Filter by Author</MenuItem>
              <MenuItem>Filter by Published</MenuItem>
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
              <MenuItem>Ascending</MenuItem>
              <MenuItem>Descending</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
        <Button
          backgroundColor={textColor}
          color={'white'}
          marginLeft={5}
          onClick={() => createNew()}
        >
          Create {title} +
        </Button>
      </Flex>
    </Flex>
  )
}
