//import { FC } from 'react'

import { FC } from 'react'

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
import { SessionUser } from '@wsvvrijheid/types'
import { GoSignOut } from 'react-icons/go'

import { AdminNav } from '../AdminNav'

type AdminSidebarProps = {
  user: SessionUser
  onLogout: () => void
}

export const AdminSidebar: FC<AdminSidebarProps> = ({ user, onLogout }) => {
  return (
    <Stack py={8} px={4} bg="white" spacing={8} h="100%" shadow="lg">
      {/* Logo */}
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
      {/* User */}
      <Stack>
        <HStack>
          <Avatar size="sm" src={user?.avatar} name={user?.username} />
          <Box flex={1} fontSize="sm" lineHeight={1.25}>
            <Text w={160} noOfLines={1} fontWeight={600}>
              {user?.username}
            </Text>
            <Text w={175} noOfLines={1}>
              {user?.email}
            </Text>
          </Box>
          <Tooltip label="Logout" bg="white">
            <IconButton
              size="sm"
              fontSize="lg"
              _hover={{ color: 'red.500' }}
              aria-label="Logout"
              icon={<GoSignOut />}
              variant="ghost"
              onClick={onLogout}
            />
          </Tooltip>
        </HStack>
      </Stack>

      {/* Menu */}
      <Stack flex={1} overflow="auto">
        <Box pos="sticky" top={0} p={2} bg="white" zIndex={1}>
          <Text fontWeight={600}>MENU</Text>
        </Box>

        {/* AdminNav */}
        <AdminNav user={user} />
      </Stack>

      {/* Footer */}
      <Stack>
        <Divider />
        <Text fontSize={'sm'}>Wsvvrijheid &copy;All Copyrights Reserved</Text>
      </Stack>
    </Stack>
  )
}
