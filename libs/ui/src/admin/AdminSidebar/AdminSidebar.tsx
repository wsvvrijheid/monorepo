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
import { API_URL } from '@wsvvrijheid/config'
import { SessionUser } from '@wsvvrijheid/types'
import { TbChevronsLeft, TbChevronsRight } from 'react-icons/tb'

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
      bg="white"
      py={4}
      spacing={0}
      h="100%"
      shadow="base"
      align={expanded ? 'stretch' : 'center'}
    >
      {/* Logo */}
      <Link href="/">
        <HStack align="center" spacing={4} alignItems="center" justify="center">
          <Avatar
            size={expanded ? 'lg' : 'md'}
            src={`${API_URL}/uploads/wsvvrijheid_735585809a.svg`}
            name="Wsvvrijheid"
          />
          {expanded && (
            <Text color={'blue.500'} fontWeight="bold" fontSize="xl">
              Dashboard
            </Text>
          )}
        </HStack>
      </Link>
      {/* User */}
      <Box py={4}>
        <AdminSidebarProfile
          user={user}
          expanded={expanded}
          onLogout={onLogout}
        />
      </Box>

      {/* Menu */}
      <Box flex={1} overflow="auto">
        <Stack>
          {expanded && (
            <Box pos="sticky" top={0} px={4} bg="white" zIndex={1}>
              <Text fontWeight="semibold">MENU</Text>
            </Box>
          )}

          {/* AdminNav */}
          <AdminNav expanded={expanded} user={user} />
        </Stack>
      </Box>

      {/* Footer */}
      <Box>
        <Divider />
        <Stack>
          <Tooltip
            {...(!expanded && { label: 'Expand' })}
            bg="white"
            placement="right"
            color="initial"
          >
            <Button
              variant="ghost"
              rounded="0"
              _hover={{ bg: 'blackAlpha.50' }}
              onClick={onToggleExpand}
              justifyContent={expanded ? 'start' : 'center'}
              px={4}
            >
              {expanded && (
                <Text flex={1} textAlign="left">
                  Collapse
                </Text>
              )}
              <Box
                mr={expanded ? 2 : 0}
                as={expanded ? TbChevronsLeft : TbChevronsRight}
                boxSize={6}
              />
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
