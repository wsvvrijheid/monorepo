import React, { useEffect, useRef } from 'react'

import { Heading, Stack } from '@chakra-ui/react'
import { GetServerSidePropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { AdminLayout, ArchivePostGenAI } from '@wsvvrijheid/ui'

export default function ArchiveContent() {
  const { t } = useTranslation()
  const title = useRef<string>()
  const { locale, query } = useRouter()
  const archiveContentId = query.id

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      id: { $eq: archiveContentId },
    },
    locale,
  })

  useEffect(() => {
    title.current = t('archive-content')
  }, [t])

  const archiveContentData = archiveContentQuery.data?.data[0]

  return (
    <AdminLayout seo={{ title: title.current }}>
      <Stack>
        {archiveContentData?.id && (
          <ArchivePostGenAI
            archiveContentId={archiveContentData.id}
            content={archiveContentData.content}
          />
        )}
      </Stack>
    </AdminLayout>
  )
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
