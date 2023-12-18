import { FC, Fragment } from 'react'

import {
  Button,
  DarkMode,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Avatar,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'

import { ProfileMenuProps } from './types'
import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, isLoggedIn }) => {
  const isScrolled = useScroll()
  const { t } = useTranslation()
  const { profile, logout } = useAuthContext()

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
      <MenuButton
        as={Button}
        size={'sm'}
        leftIcon={
          <Avatar
            size={'xs'}
            bg={'white'}
            src={`${ASSETS_URL}${profile?.avatar}`}
            name={profile?.name || user?.username}
          />
        }
      >
        {profile?.name || user?.username}
      </MenuButton>
      <MenuList>
        <MenuItem as={Navigate} href={'/profile'}>
          {t('profile')}
        </MenuItem>

        <MenuDivider />
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={logout}>
          {t('logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
