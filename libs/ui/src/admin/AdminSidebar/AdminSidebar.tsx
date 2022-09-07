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
  Button,
  Tooltip,
} from '@chakra-ui/react'
import { SessionUser } from '@wsvvrijheid/types'
import { FiArrowLeftCircle, FiArrowRightCircle } from 'react-icons/fi'

import { AdminNav } from '../AdminNav'
import { AdminSidebarProfile } from './AdminSidebarProfile'

type AdminSidebarProps = {
  user: SessionUser
  onLogout: () => void
  onToggleExpand: () => void
  expanded: boolean
}

export const AdminSidebar: FC<AdminSidebarProps> = ({
  user,
  onLogout,
  onToggleExpand,
  expanded,
}) => {
  return (
    <Stack
      py={8}
      px={4}
      bg="white"
      spacing={0}
      h="100%"
      shadow="lg"
      align={expanded ? 'stretch' : 'center'}
    >
      {/* Logo */}
      <Link href="/">
        <HStack align="center" spacing={4} alignItems="center" justify="center">
          <Avatar
            size={expanded ? 'lg' : 'md'}
            src="https://wsvvrijheid.nl/images/logo.svg"
            name="Wsvvrijheid"
          />
          {expanded && (
            <Text
              color={'blue.500'}
              fontWeight={700}
              fontSize="lg"
              lineHeight={1.25}
            >
              WEES DE STEM <br />
              VOOR VRIJHEID
            </Text>
          )}
        </HStack>
      </Link>
      {/* User */}
      <Box py={8}>
        <AdminSidebarProfile
          user={user}
          expanded={expanded}
          onLogout={onLogout}
        />
      </Box>

      {/* Menu */}
      <Box flex={1} overflow="auto">
        <Stack mx={expanded ? -2 : 0}>
          {expanded && (
            <Box pos="sticky" top={0} p={2} bg="white" zIndex={1}>
              <Text fontWeight={600}>MENU</Text>
            </Box>
          )}

          {/* AdminNav */}
          <AdminNav expanded={expanded} user={user} />
        </Stack>
      </Box>

      {/* Footer */}
      <Box>
        <Stack mx={expanded ? -2 : 0}>
          <Divider />
          <Tooltip
            {...(!expanded && { label: 'Expand' })}
            bg="white"
            placement="right"
          >
            <Button
              size="lg"
              variant="ghost"
              onClick={onToggleExpand}
              justifyContent={expanded ? 'start' : 'center'}
              px={2}
            >
              <Box
                mr={expanded ? 2 : 0}
                as={expanded ? FiArrowLeftCircle : FiArrowRightCircle}
              />
              {expanded && <Text>Collapse</Text>}
            </Button>
          </Tooltip>

          {expanded && (
            <Text fontSize={'sm'} textAlign="center">
              Wsvvrijheid &copy;All Copyrights Reserved
            </Text>
          )}
        </Stack>
      </Box>
    </Stack>
  )
}
