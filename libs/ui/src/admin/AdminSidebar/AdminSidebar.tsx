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

import { useAuth } from '../../hooks'
import { AdminNav } from '../AdminNav'

export const AdminSidebar = () => {
  const { user } = useAuth()

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
          <Text
            color={'blue.500'}
            paddingLeft={1}
            mx={2}
            my={2}
            _hover={{ color: 'blue.500' }}
          >
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
        <Button variant={'gray.500'} onClick={() => alert('logout completed')}>
          Logout
        </Button>
      </HStack>
      {/*menu ................................*/}
      <Stack>
        <Stack h={8} w={67}>
          <Text fontWeight={'bold'}>MENU</Text>
        </Stack>
        {/* Amin Nav .........................*/}
        <AdminNav />
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
