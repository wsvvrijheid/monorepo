import { FC } from 'react'

import {
  Flex,
  HStack,
  Image,
  Link,
  Stack,
  useBreakpointValue,
} from '@chakra-ui/react'
import { motion } from 'framer-motion'
import Headroom from 'react-headroom'

import { HeaderMobile } from './HeaderMobile'
import { HeaderNav } from './HeaderNav'
import { ProfileMenu } from './ProfileMenu'
import { HeaderProps } from './types'
import { useScroll } from '../../hooks'
import { Container } from '../Container'
import { LocaleSwitcher } from '../LocaleSwitcher'

export const Header: FC<HeaderProps> = ({
  animated = true,
  isDark,
  logo,
  headerMenu,
  profileMenu,
  isLoggedIn,
}) => {
  const isScrolled = useScroll()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  return (
    <Headroom>
      <Flex
        bg={isScrolled ? 'white' : 'transparent'}
        borderBottomWidth={isScrolled ? 1 : 0}
        borderBottomColor="blackAlpha.300"
        transition="all 0.3s ease-in-out"
        align="center"
        h={{ base: '64px', lg: '100px' }}
      >
        <Container>
          <Flex justify="space-between" align="center" pos="relative">
            <motion.div
              {...(animated && {
                animate: { rotate: -360 },
                transition: { ease: 'linear', repeat: Infinity, duration: 60 },
              })}
            >
              <Link href="/">
                <Image
                  width={{ base: '64px', lg: '92px' }}
                  height={{ base: '64px', lg: '92px' }}
                  objectFit="cover"
                  src={logo}
                  alt="logo"
                />
              </Link>
            </motion.div>
            <HStack
              display={{ base: 'none', lg: 'flex' }}
              align="center"
              spacing={4}
            >
              <Stack spacing={1}>
                <HStack justify="end">
                  <LocaleSwitcher isDark={isDark} />
                  {!isLoggedIn && profileMenu && (
                    <ProfileMenu isDark={isDark} {...profileMenu} />
                  )}
                </HStack>
                {!isMobile && (
                  <HeaderNav
                    direction="row"
                    menu={headerMenu}
                    isDark={isDark}
                  />
                )}
              </Stack>
              {isLoggedIn && profileMenu && (
                <ProfileMenu isDark={isDark} {...profileMenu} />
              )}
            </HStack>
            {isMobile && (
              <HeaderMobile
                logo={logo}
                isDark={isDark}
                profileMenu={profileMenu}
                headerMenu={headerMenu}
              />
            )}
          </Flex>
        </Container>
      </Flex>
    </Headroom>
  )
}
