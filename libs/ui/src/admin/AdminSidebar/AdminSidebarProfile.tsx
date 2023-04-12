import { FC } from 'react'

import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Text,
  Tooltip,
} from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'

import { SessionUser } from '@wsvvrijheid/types'

export type AdminSidebarProfileProps = {
  user: SessionUser
  onLogout: () => void
  expanded: boolean
}

export const AdminSidebarProfile: FC<AdminSidebarProfileProps> = ({
  expanded,
  user,
  onLogout,
}) => {
  return (
    <Stack p={4} shadow="base">
      {expanded ? (
        <HStack>
          <Avatar size="sm" src={user?.avatar} name={user?.username} />

          <Box flex={1} fontSize="sm" lineHeight={1.25}>
            <Text w={160} noOfLines={1} fontWeight={600}>
              {user?.username}
            </Text>
            <Text w={175} noOfLines={1}>
              {user?.email}
            </Text>
            <Text w={160} noOfLines={1} fontWeight={600}>
              {user?.roles}
            </Text>
          </Box>

          <Tooltip label="Logout" bg="white" color="initial">
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
      ) : (
        <Popover trigger="hover" placement="right-start">
          <PopoverTrigger>
            <Avatar
              cursor="pointer"
              size="sm"
              src={user?.avatar}
              name={user?.username}
            />
          </PopoverTrigger>
          <PopoverArrow />
          <PopoverContent w="max-content">
            <PopoverBody>
              <HStack spacing={8}>
                <Box flex={1} fontSize="sm" lineHeight={1.25}>
                  <Text w={160} noOfLines={1} fontWeight={600}>
                    {user?.username}
                  </Text>
                  <Text w={175} noOfLines={1}>
                    {user?.email}
                  </Text>
                </Box>

                <Tooltip label="Logout" bg="white" color="initial">
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
            </PopoverBody>
          </PopoverContent>
        </Popover>
      )}
    </Stack>
  )
}
