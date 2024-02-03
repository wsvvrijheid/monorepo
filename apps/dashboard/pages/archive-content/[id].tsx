import React from 'react'

import { useRouter } from 'next/router'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'
import { ArchivePostGenAI } from '@wsvvrijheid/ui'



export default function ArchiveContent() {
  const { locale, query } = useRouter()
  const id = query.id

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    locale,
  })

  const archiveContentData = archiveContentQuery.data?.data[0]

  return (
    <div>
      <h1>ArchiveContent {id}</h1>
      {archiveContentData?.id &&
        <ArchivePostGenAI archiveContentId={archiveContentData.id} content={archiveContentData.content} />
      }
    </div>
  )
}