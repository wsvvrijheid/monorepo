import { FC } from 'react'

import {
  Button,
  useDisclosure,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
} from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaPencil } from 'react-icons/fa6'

import { strapiRequest } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { AdminLayout, ArchivePostGenAI, ModelEditModal } from '@wsvvrijheid/ui'

type HashtagPageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HashtagPage: FC<HashtagPageProps> = ({ hashtag }) => {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      $or: hashtag.categories?.map(category => ({
        categories: { id: { $eq: category.id } },
      })),
    },
    locale,
  })

  const archiveContents = archiveContentQuery.data?.data

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
        onSuccess={onClose}
      />
      {/* TODO: Wrap Tabs with ArchiveContentPostContext */}
      <Tabs>
        <TabList>
          {archiveContents?.map(archiveContent => {
            return (
              <Tab
                fontWeight={700}
                maxW={200}
                noOfLines={1}
                key={archiveContent.id}
              >
                {archiveContent.title}
              </Tab>
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
                />
              </TabPanel>
            )
          })}
        </TabPanels>
      </Tabs>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.query.id ? +context.query.id : 0

  const hashtagResponse = await strapiRequest<Hashtag>({
    endpoint: 'hashtags',
    id,
  })

  const hashtag = hashtagResponse.data ?? null

  return {
    props: {
      hashtag,
      ...(await ssrTranslations(locale)),
    },
  }
}

export default HashtagPage
