//import { FC } from 'react'

import {
  Link,
  Stack,
  Text,
  Image,
  HStack,
  Avatar,
  Divider,
  Button,
} from '@chakra-ui/react'
import { BsNewspaper, BsTranslate } from 'react-icons/bs'
import { MdOutlineSpaceDashboard } from 'react-icons/md'

import { useAuth } from '../../hooks'
// export type AdminSidebarProps = {} FC<AdminSidebarProps>
export const AdminSidebar = () => {
  const { user } = useAuth()
  console.log('user', user)
  return (
    <Stack w={300} py={8} px={4} bg="white" spacing={8}>
      {/*logo ................................*/}
      <Link href="/">
        <HStack align="center" maxW={268}>
          <Image
            width="64px"
            height="64px"
            objectFit="fill"
            src="https://wsvvrijheid.nl/images/logo.svg"
            alt="logo"
          />
          <Text color={'blue.500'} paddingLeft={1} mx={2} my={2}>
            <Text>WEES DE STEM</Text>
            <Text>VOOR VRIJHEID</Text>
          </Text>
        </HStack>
      </Link>
      {/*user ................................*/}
      <HStack>
        <Avatar size="sm" src={user?.avatar} name={user?.username} />
        <Stack>
          <Text fontWeight={'bold'}>{user?.username}</Text>
          <Text>{user?.email}</Text>
        </Stack>
      </HStack>
      {/*menu ................................*/}
      <Stack>
        <Stack h={8} w={67}>
          <Text fontWeight={'bold'}>Menu</Text>
        </Stack>
        <Stack>
          <Link href="/">
            <Button
              variant={'gray.500'}
              colorScheme="primary"
              size="lg"
              leftIcon={<MdOutlineSpaceDashboard />}
            >
              Dashboard
            </Button>
          </Link>
        </Stack>
        <Stack>
          <Link href="/">
            <Button
              variant={'gray.500'}
              colorScheme="primary"
              size="lg"
              leftIcon={<BsTranslate />}
            >
              Translate
            </Button>
          </Link>
        </Stack>
        <Stack>
          <Link href="/">
            <Button
              variant={'gray.500'}
              colorScheme="primary"
              size="lg"
              leftIcon={<BsTranslate />}
            >
              Arts
            </Button>
          </Link>
        </Stack>
        <Stack>
          <Link href="/">
            <Button
              variant={'gray.500'}
              colorScheme="primary"
              size="lg"
              leftIcon={<BsTranslate />}
            >
              Hashtag Posts
            </Button>
          </Link>
        </Stack>
        <Stack>
          <Link href="/">
            <Button
              variant={'gray.500'}
              colorScheme="primary"
              size="lg"
              leftIcon={<BsNewspaper />}
            >
              News
            </Button>
          </Link>
        </Stack>
      </Stack>

      {/*footer ................................*/}
      <Stack>
        <Divider />
        <Text fontSize={'sm'} mr={1}>
          Wsvvrijheid &copy;All Copyrights Reserved
        </Text>
      </Stack>
    </Stack>
  )
}
