import { useState } from 'react'

import {
  Badge,
  Button,
  Center,
  Link,
  List,
  ListItem,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Wrap,
  useDisclosure,
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaPencil } from 'react-icons/fa6'

import { strapiRequest } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import {
  AdminLayout,
  ArchivePostGenAI,
  ModelEditModal,
  useGenPostContext,
} from '@wsvvrijheid/ui'
import { GenPostProvider } from '@wsvvrijheid/ui'

const HashtagPage = () => {
  const { t } = useTranslation()
  const { locale, query } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const { addPost } = useGenPostContext()

  const id = query.id ? +query.id : 0

  const hashtagQuery = useStrapiRequest<Hashtag>({
    endpoint: 'hashtags',
    id,
  })

  const hashtag = hashtagQuery.data?.data
  const categories = hashtag?.categories || []

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      $or: categories?.map(category => ({
        categories: { id: { $eq: category.id } },
      })),
    },
    locale,
    queryOptions: {
      enabled: categories.length > 0,
    },
  })

  const archiveContents = archiveContentQuery.data?.data

  const handleSuccess = async () => {
    onClose()
    await hashtagQuery.refetch()
    archiveContentQuery.refetch()
  }

  if (!hashtag) {
    return (
      <Center h={'100vh'}>
        <Spinner />
      </Center>
    )
  }

  return (
    <AdminLayout seo={{ title: hashtag.title }}>
      <Button alignSelf={'end'} onClick={onOpen} leftIcon={<FaPencil />}>
        {t('edit')}
      </Button>

      <ModelEditModal
        isOpen={isOpen}
        onClose={onClose}
        endpoint="hashtags"
        id={hashtag.id}
        title={hashtag.title}
        onSuccess={handleSuccess}
      />
      {/* TODO: Wrap Tabs with ArchiveContentPostContext */}
      {!hashtag?.categories?.length ? (
        <Center h={'60vh'}>{"Please update hashtag's categories"}</Center>
      ) : (
        <GenPostProvider>
          <Tabs colorScheme="primary">
            <TabList>
              {archiveContents?.map(archiveContent => {
                return (
                  <Popover
                    placement="top"
                    key={archiveContent.id}
                    trigger="hover"
                  >
                    <PopoverTrigger>
                      <Tab fontWeight={700} maxW={200} noOfLines={1}>
                        {archiveContent.title}
                      </Tab>
                    </PopoverTrigger>
                    <PopoverContent>
                      <List p={2} spacing={2}>
                        <ListItem>{archiveContent.source}</ListItem>
                        <ListItem>
                          <Link isExternal href={archiveContent.link}>
                            {archiveContent.link}
                          </Link>
                        </ListItem>
                        <ListItem>
                          <Wrap>
                            {archiveContent.categories?.map(c => (
                              <Badge key={c.id}>{c[`name_${locale}`]}</Badge>
                            ))}
                          </Wrap>
                        </ListItem>
                      </List>
                    </PopoverContent>
                  </Popover>
                )
              })}
            </TabList>
            <TabPanels>
              {archiveContents?.map(archiveContent => {
                return (
                  <TabPanel key={archiveContent.id}>
                    <ArchivePostGenAI
                      archiveContentId={archiveContent.id}
                      content={archiveContent.content}
                      // TODO: Use ArchiveContentPostContext to store saved posts
                      // TODO: Consider deleting saved posts from context after saving them to the database?
                      onSuccess={data => console.log(data)}
                      // TODO: Use ArchiveContentPostContext to get initial posts
                      initialPosts={[]}
                      colorScheme="green"
                    />
                  </TabPanel>
                )
              })}
            </TabPanels>
          </Tabs>
        </GenPostProvider>
      )}
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.query.id ? +context.query.id : 0

  const queryClient = new QueryClient()

  const queryKey = Object.entries({ endpoint: 'hashtags', id })

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Hashtag>({ endpoint: 'hashtags', id }),
  })

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}

export default HashtagPage
