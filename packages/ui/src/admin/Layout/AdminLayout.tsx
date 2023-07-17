import { FC, ReactNode, useEffect, useRef, useState } from 'react'

import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Tooltip,
  useBreakpointValue,
  useOutsideClick,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { MdOutlineNotifications } from 'react-icons/md'

import { useAuthContext } from '@wsvvrijheid/context'

import { Navigate } from '../../components'
import { AdminSidebar } from '../AdminSidebar'
import { CreateModelButton } from '../CreateModelButton'
import { LanguageSwitcher } from '../LanguageSwitcher'

export type AdminLayoutProps = {
  children: ReactNode
  isLoading?: boolean
  hasBackButton?: boolean
  seo: NextSeoProps
}

export const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  isLoading,
  hasBackButton,
  seo,
}) => {
  const { user, logout, checkAuth } = useAuthContext()

  const router = useRouter()

  const sidebarRef = useRef<HTMLDivElement>(null)

  const isMobile = useBreakpointValue({ base: true, lg: false })

  const [expanded, setExpandedStorage] = useState(true)

  useOutsideClick({
    ref: sidebarRef,
    handler: () => setExpandedStorage(false),
  })

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (isMobile) {
      setExpandedStorage(false)
    }
  }, [isMobile])

  const toggleSidebarExpanded = () => {
    setExpandedStorage(!expanded)
  }

  const handleLogout = async () => {
    await logout()

    router.push('/login')
  }

  const slugs = router.asPath.split('/')
  const parentSlug = slugs.slice(0, slugs.length - 1).join('/')

  return (
    <>
      <NextSeo {...seo} />
      <Flex h={'full'} pos={'relative'}>
        {/* Sidebar */}
        <Box
          top={0}
          left={0}
          h="full"
          overflowY={'auto'}
          zIndex={1}
          ref={sidebarRef}
        >
          <AdminSidebar
            user={user}
            onLogout={handleLogout}
            expanded={expanded}
            onToggleExpand={toggleSidebarExpanded}
          />
        </Box>

        <Stack
          spacing={0}
          as="main"
          bg="gray.50"
          h="full"
          overflowY={'auto'}
          flex={1}
          pb={4}
          ml={{ base: 16, lg: 0 }}
        >
          {isLoading ? (
            <Center h="full">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              <HStack px={4} justify="space-between" h={20}>
                <HStack>
                  {hasBackButton && (
                    <Tooltip label={'Go back'}>
                      <IconButton
                        aria-label="back"
                        icon={<FaArrowLeft />}
                        rounded="full"
                        onClick={() => router.push(`/${parentSlug}`)}
                      />
                    </Tooltip>
                  )}
                  <Heading size={{ base: 'md', lg: 'xl' }}>{seo.title}</Heading>
                </HStack>

                {/* TODO Create notification component */}
                <HStack>
                  {user && (
                    <IconButton
                      aria-label="notifications"
                      icon={<MdOutlineNotifications />}
                      variant="outline"
                      rounded="full"
                      colorScheme={'gray'}
                    />
                  )}
                  <LanguageSwitcher responsive />
                  <CreateModelButton />
                  {!user && (
                    <Navigate href={'/login'}>
                      <Button
                        colorScheme={'blue'}
                        leftIcon={<FaUser />}
                        rounded={'full'}
                      >
                        Login
                      </Button>
                    </Navigate>
                  )}
                </HStack>
              </HStack>

              {/* Page Content */}
              <Stack px={4} h={'full'} flex={1} spacing={4} overflowY={'auto'}>
                {children}
              </Stack>
            </>
          )}
        </Stack>
      </Flex>
    </>
  )
}
