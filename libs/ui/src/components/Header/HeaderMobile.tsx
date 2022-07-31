import { FC } from 'react'

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import { FaBars } from 'react-icons/fa'

import { useScroll } from '../../hooks'
import { LocaleSwitcher } from '../LocaleSwitcher/LocaleSwitcher'
import { HeaderMobileNav } from './HeaderMobileNav'
import { ProfileMenu } from './ProfileMenu'
import { HeaderMobileProps } from './types'

export const HeaderMobile: FC<HeaderMobileProps> = ({
  isDark,
  headerMenu,
  profileMenu,
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const isScrolled = useScroll()

  return (
    <HStack display={{ base: 'flex', lg: 'none' }}>
      <Drawer isOpen={isOpen} onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerBody>
            <HeaderMobileNav
              profileMenu={profileMenu}
              headerMenu={headerMenu}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <LocaleSwitcher isDark={isDark} />
      {profileMenu && <ProfileMenu isDark={isDark} {...profileMenu} />}
      <IconButton
        variant="outline"
        color={!isScrolled && isDark ? 'white' : 'initial'}
        colorScheme={!isScrolled && isDark ? 'blackAlpha' : 'whiteAlpha'}
        onClick={onToggle}
        aria-label="menu"
        icon={<FaBars />}
      />
    </HStack>
  )
}
