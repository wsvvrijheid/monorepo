import React from 'react'

import { useRouter } from 'next/router'

const BlogInfo = () => {
  const {
    locale,
    query: { slug },
  } = useRouter()
  return (
    <div>
      {slug}-{locale}
    </div>
  )
}

export default BlogInfo
