import { FC, ReactNode } from 'react'

import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Tooltip,
  useBoolean,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOutlineNotifications } from 'react-icons/md'
import { useLocalStorage } from 'usehooks-ts'

import {
  destroyAuth,
  useAppDispatch,
  useAuthSelector,
} from '@wsvvrijheid/store'

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
  const { user } = useAuthSelector()

  const router = useRouter()
  const dispatch = useAppDispatch()

  const [expandedStorage, setExpandedStorage] = useLocalStorage(
    'adminSidebarExpanded',
    true,
  )
  const [expanded, { toggle }] = useBoolean(expandedStorage)

  const toggleSidebarExpanded = () => {
    setExpandedStorage(!expanded)
    toggle()
  }

  const handleLogout = async () => {
    await dispatch(destroyAuth()).unwrap()

    router.push('/login')
  }

  if (!user) {
    return (
      <Center h={'100vh'}>
        <Spinner size={'lg'} />
      </Center>
    )
  }

  const slug = router.asPath.split('/')[1]

  return (
    <>
      <NextSeo {...seo} />
      <Box bg="gray.50">
        {/* Sidebar */}
        <Box
          pos="fixed"
          zIndex="sticky"
          top={0}
          left={0}
          h="100vh"
          w={expanded ? 300 : 16}
        >
          <AdminSidebar
            user={user}
            onLogout={handleLogout}
            expanded={expanded}
            onToggleExpand={toggleSidebarExpanded}
          />
        </Box>

        <Stack
          as="main"
          ml={expanded ? 300 : 16}
          spacing={4}
          minH="100vh"
          overflow="auto"
          pb={8}
        >
          {isLoading ? (
            <Center h="100vh">
              <Spinner size="xl" />
            </Center>
          ) : (
            <>
              <HStack px={4} mt={10} justify="space-between">
                <HStack>
                  {hasBackButton && (
                    <Tooltip label={'Go back'}>
                      <IconButton
                        aria-label="back"
                        icon={<FaArrowLeft />}
                        colorScheme={'blackAlpha'}
                        rounded="full"
                        onClick={() => router.push(`/${slug}`)}
                      />
                    </Tooltip>
                  )}
                  <Heading
                    textTransform="capitalize"
                    color="blackAlpha.500"
                    size={{ base: 'md', lg: '2xl' }}
                  >
                    {seo.title}
                  </Heading>
                </HStack>

                {/* TODO Create notification component */}
                <HStack>
                  <IconButton
                    aria-label="notifications"
                    icon={<MdOutlineNotifications />}
                    variant="outline"
                    rounded="full"
                  />
                  <LanguageSwitcher responsive />
                  <CreateModelButton />
                </HStack>
              </HStack>

              {/* Page Content */}
              <Stack spacing={4} px={4}>
                {children}
              </Stack>
            </>
          )}
        </Stack>
      </Box>
    </>
  )
}
