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
import { API_URL } from '@wsvvrijheid/config'
import {
  destroyAuth,
  useAppDispatch,
  useAuthSelector,
} from '@wsvvrijheid/store'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { FiLogIn, FiLogOut } from 'react-icons/fi'

import { useScroll } from '../../hooks'
import { Navigate } from '../Navigate'
import { ProfileMenuProps } from './types'

export const ProfileMenu: FC<ProfileMenuProps> = ({ isDark, menu }) => {
  const dispatch = useAppDispatch()
  const isScrolled = useScroll()
  const router = useRouter()
  const { t } = useTranslation()
  const { user, isLoggedIn } = useAuthSelector()

  const handleLogout = async () => {
    await dispatch(destroyAuth()).unwrap()
    console.log('Destroyed auth')

    router.push('/login')
  }

  if (!isLoggedIn)
    return !isScrolled && isDark ? (
      <DarkMode>
        <Navigate href="/login">
          <Button
            size="sm"
            colorScheme="primary"
            variant={!isScrolled && isDark ? 'solid' : 'outline'}
            rightIcon={<FiLogIn />}
          >
            {t('login.sign-in')}
          </Button>
        </Navigate>
      </DarkMode>
    ) : (
      <Navigate href="/login">
        <Button
          size="sm"
          colorScheme="primary"
          variant={!isScrolled && isDark ? 'solid' : 'outline'}
          rightIcon={<FiLogIn />}
        >
          {t('login.sign-in')}
        </Button>
      </Navigate>
    )

  return (
    <Menu placement="bottom">
      <MenuButton>
        <Avatar
          boxSize={{ base: 10, lg: 12 }}
          src={`${API_URL}${user?.avatar}`}
          name={user?.name || user?.username}
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
        <MenuItem icon={<FiLogOut />} color="red.400" onClick={handleLogout}>
          {t('profile.logout')}
        </MenuItem>
      </MenuList>
    </Menu>
  )
}
