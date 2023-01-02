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
import {
  destroyAuth,
  useAppDispatch,
  useAuthSelector,
} from '@wsvvrijheid/store'
import { startCase } from 'lodash'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { FaArrowLeft } from 'react-icons/fa'
import { MdOutlineNotifications } from 'react-icons/md'
import { useLocalStorage } from 'usehooks-ts'

import { AdminSidebar } from '../AdminSidebar'
import { PageHeader, PageHeaderProps } from '../PageHeader'

export type AdminLayoutProps = {
  children: ReactNode
  title: string
  isLoading?: boolean
  headerProps?: PageHeaderProps
  hasBackButton?: boolean
}

export const AdminLayout: FC<AdminLayoutProps> = ({
  children,
  title,
  isLoading,
  headerProps,
  hasBackButton,
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

  return (
    <>
      <NextSeo title={startCase(title)} />
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
                        onClick={() => router.back()}
                      />
                    </Tooltip>
                  )}
                  <Heading textTransform="capitalize" color="blackAlpha.500">
                    {title}
                  </Heading>
                </HStack>

                {/* TODO Create notification component */}
                <IconButton
                  aria-label="notifications"
                  icon={<MdOutlineNotifications />}
                  variant="outline"
                  rounded="full"
                />
              </HStack>

              {/* Page Content */}
              <Box pos="sticky" top={0} zIndex={1}>
                {headerProps && (
                  <PageHeader defaultLocale="tr" {...headerProps} />
                )}
              </Box>

              <Box px={4}>{children}</Box>
            </>
          )}
        </Stack>
      </Box>
    </>
  )
}
