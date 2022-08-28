import { useRouter } from 'next/router'
import React from 'react'

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
