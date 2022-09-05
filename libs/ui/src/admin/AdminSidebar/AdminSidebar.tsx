//import { FC } from 'react'

import {
  Link,
  Stack,
  Text,
  HStack,
  Avatar,
  Divider,
  Box,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'

import { useAuth } from '../../hooks'
import { AdminNav } from '../AdminNav'

export const AdminSidebar = () => {
  const { user } = useAuth()

  return (
    <Stack w={300} py={8} px={4} bg="white" spacing={4} h="100vh">
      {/*logo ................................*/}
      <Link href="/">
        <HStack align="center" spacing={4} alignItems="center" justify="center">
          <Avatar
            size="lg"
            src="https://wsvvrijheid.nl/images/logo.svg"
            name="Wsvvrijheid"
          />
          <Text color={'blue.500'} fontWeight={600} fontSize="lg">
            WEES DE STEM <br />
            VOOR VRIJHEID
          </Text>
        </HStack>
      </Link>
      {/*user ................................*/}
      <Stack>
        <HStack spacing={4}>
          <Avatar size="sm" src={user?.avatar} name={user?.username} />
          <Box flex={1}>
            <Text noOfLines={1} fontWeight={600}>
              {user?.username}
            </Text>
            <Text noOfLines={1}>{user?.email}</Text>
          </Box>
          <Tooltip label="Logout" bg="white">
            <IconButton
              variant="ghost"
              aria-label="Logout"
              _hover={{ color: 'red.500' }}
              icon={<GoSignOut />}
            />
          </Tooltip>
        </HStack>
      </Stack>
      <Divider />
      {/*menu ................................*/}
      <Stack flex={1} overflow="auto">
        <Box pos="sticky" top={0} p={4} bg="white" zIndex={1}>
          <Text fontWeight={600}>MENU</Text>
        </Box>

        {/* Amin Nav .........................*/}
        <AdminNav />
      </Stack>
      {/*footer ................................*/}
      <Stack>
        <Divider />
        <Text fontSize={'sm'}>Wsvvrijheid &copy;All Copyrights Reserved</Text>
      </Stack>
    </Stack>
  )
}
