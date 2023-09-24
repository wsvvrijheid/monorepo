import { FC, Fragment } from 'react'

import {
  Button,
  DarkMode,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'
import { WAvatar } from '../WAvatar'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, menu }) => {
  const isScrolled = useScroll()
  const { t } = useTranslation()
  const { user, isLoggedIn, logout } = useAuthContext()

  const Wrapper = !isScrolled && isDark ? DarkMode : Fragment

  if (!isLoggedIn) {
    return (
      <Wrapper>
        <Link href="/login" className="login-link">
          <Button
            size="sm"
            variant={!isScrolled && isDark ? 'solid' : 'outline'}
            rightIcon={<FiLogIn />}
          >
            {t('login.signin')}
          </Button>
        </Link>
      </Wrapper>
    )
  }

  return (
    <Menu placement="bottom">
      <MenuButton>
        <WAvatar
          boxSize={{ base: 10, lg: 12 }}
          src={`${ASSETS_URL}${user?.profile?.avatar}`}
          name={user?.profile?.name || user?.username}
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
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={logout}>
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
