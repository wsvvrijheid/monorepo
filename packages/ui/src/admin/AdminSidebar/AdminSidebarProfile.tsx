import { FC } from 'react'

import { Box, HStack, IconButton, Stack, Text, Tooltip } from '@chakra-ui/react'
import { GoSignOut } from 'react-icons/go'

import { SessionUser } from '@wsvvrijheid/types'

import { WAvatar } from '../../components'

export type AdminSidebarProfileProps = {
  user: SessionUser
  onLogout: () => void
}

export const AdminSidebarProfile: FC<AdminSidebarProfileProps> = ({
  user,
  onLogout,
}) => {
  return (
    <Stack p={4} shadow="base">
      <HStack>
        <WAvatar size="sm" src={user?.avatar} name={user?.username} />

        <Box flex={1} fontSize="sm" lineHeight={1.25}>
          <Text w={160} noOfLines={1} fontWeight={600}>
            {user?.name || user?.username}
          </Text>
          <Text w={160} noOfLines={1} textTransform={'capitalize'}>
            {user?.roles.join(' - ')}
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
    </Stack>
  )
}
