import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { strapiRequest } from '@wsvvrijheid/lib'
import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { AdminLayout, ArchivePostGenAI } from '@wsvvrijheid/ui'

type Props = InferGetServerSidePropsType<typeof getServerSideProps>

export default function ArchiveContent({ categories }: Props) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  const archiveContentsQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      categories: { $in: categories?.map(c => c.id) },
    },
    locale,
  })

  const archiveContents = archiveContentsQuery.data?.data || []

  return (
    <AdminLayout seo={{ title: t('archive-contents') }}>
      <Tabs isLazy>
        <TabList>
          {archiveContents.map((archiveContent, index) => (
            <Tab key={archiveContent.id}>
              <Box fontWeight={700} noOfLines={1} maxW={200}>
                {index + 1}. {archiveContent.source.repeat(10)}
              </Box>
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          {archiveContents.map(archiveContent => (
            <TabPanel key={archiveContent.id}>
              <ArchivePostGenAI
                archiveContentId={archiveContent.id}
                content={archiveContent.content}
              />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id ? +context.params?.id : 0

  const archiveContentResponse = await strapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    id,
  })

  const categories = archiveContentResponse.data?.categories || []

  return {
    props: {
      categories,
      ...(await ssrTranslations(locale)),
    },
  }
}
