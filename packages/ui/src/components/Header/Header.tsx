import { FC } from 'react'

import { As, Box, Flex, HStack, Image, Link, Stack } from '@chakra-ui/react'
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
  hasProfile,
  isLoggedIn,
}) => {
  const isScrolled = useScroll()

  return (
    <Box as={Headroom as unknown as As}>
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
                transition: {
                  ease: 'linear',
                  repeat: Infinity,
                  duration: 60,
                },
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
                  {hasProfile && (
                    <ProfileMenu isLoggedIn={isLoggedIn} isDark={isDark} />
                  )}
                </HStack>

                <Box display={{ base: 'none', lg: 'block' }}>
                  <HeaderNav
                    direction="row"
                    menu={headerMenu}
                    isDark={isDark}
                  />
                </Box>
              </Stack>
            </HStack>
            <Box display={{ lg: 'none' }}>
              <HeaderMobile
                isLoggedIn={isLoggedIn}
                logo={logo}
                isDark={isDark}
                hasProfile={hasProfile}
                headerMenu={headerMenu}
              />
            </Box>
          </Flex>
        </Container>
      </Flex>
    </Box>
  )
}
