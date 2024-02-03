import React from 'react'

import { useRouter } from 'next/router'


export default function ArchiveContent() {
  const router = useRouter()
  const id = router.query.id

  return (
    <div>ArchiveContent {id}</div>
  )
}