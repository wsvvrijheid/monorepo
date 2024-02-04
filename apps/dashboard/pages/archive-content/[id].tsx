import React from 'react'

import { Heading, Stack } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { ArchivePostGenAI } from '@wsvvrijheid/ui'



export default function ArchiveContent() {
  const { locale, query } = useRouter()
  const archiveContentId = query.id

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    filters: {
      id: { $eq: archiveContentId }
    },
    locale,
  })

  const archiveContentData = archiveContentQuery.data?.data[0]

  return (
    <Stack p={2}>
      <Heading mt={1}>Archive Content / {archiveContentId}</Heading>
      {archiveContentData?.id &&
        <ArchivePostGenAI archiveContentId={archiveContentData.id} content={archiveContentData.content} />
      }
    </Stack>
  )
}