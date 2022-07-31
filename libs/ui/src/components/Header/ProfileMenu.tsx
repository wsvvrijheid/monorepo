import { FC } from 'react'

import {
  Avatar,
  Button,
  DarkMode,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate/Navigate'
import { ProfileMenuProps } from './types'

export const ProfileMenu: FC<ProfileMenuProps> = ({
  isDark,
  isLoggedIn,
  login,
  logout,
  menu,
  userAvatar,
  username,
}) => {
  const isScrolled = useScroll()

  if (!isLoggedIn)
    return !isScrolled && isDark ? (
      <DarkMode>
        <Navigate href={login.link}>
          <Button
            size="sm"
            colorScheme="primary"
            variant={!isScrolled && isDark ? 'solid' : 'outline'}
            rightIcon={<FiLogIn />}
          >
            {login.label}
          </Button>
        </Navigate>
      </DarkMode>
    ) : (
      <Navigate href={login.link}>
        <Button
          size="sm"
          colorScheme="primary"
          variant={!isScrolled && isDark ? 'solid' : 'outline'}
          rightIcon={<FiLogIn />}
        >
          {login.label}
        </Button>
      </Navigate>
    )

  return (
    <Menu placement="bottom">
      <MenuButton>
        <Avatar
          boxSize={{ base: 10, lg: 12 }}
          src={userAvatar}
          name={username}
        />
      </MenuButton>
      <MenuList>
        {menu.map(item => (
          <MenuItem
            key={item.link}
            as={Navigate}
            icon={item.icon}
            href={item.link}
          >
            {item.label}
          </MenuItem>
        ))}

        <MenuDivider />
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={logout.onClick}>
          {logout.label}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
