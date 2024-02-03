import React from 'react'

import { useRouter } from 'next/router'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ArchiveContent } from '@wsvvrijheid/types/src/archive-content'


export default function ArchiveContent() {
  const { locale, query } = useRouter()
  const id = query.id

  const archiveContentQuery = useStrapiRequest<ArchiveContent>({
    endpoint: 'archive-contents',
    locale,
  })

  return (
    <div>
      <h1>ArchiveContent {id}</h1>
      {archiveContentQuery.data?.data.map((archive, idx) => {
        return <p key={idx}>{archive.content}</p>
      })}
    </div>
  )
}