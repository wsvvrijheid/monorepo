/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'

import { Input, Stack } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { Blog, StrapiCollectionResponse } from '@wsvvrijheid/types'
import { strapiRequest } from '@wsvvrijheid/lib'

const fetchBlogs = async (title?: string) => {
  // TODO: Use strapiRequest
  // TODO: Add title filter
  // TODO: Return blogs array instead of StrapiCollectionResponse ({data, meta})

  const response = await strapiRequest<Blog>({
    endpoint: 'blogs',
    locale: 'tr',
    populate: 'image',
    filters: { title: { $containsi: title } },
  })

  return response?.data
}

const useBlogsQuery = (title?: string) => {
  return useQuery({
    queryKey: ['blogs'],
    queryFn: () => fetchBlogs(title),
  })
}

export const FetchWithCustomQuery = () => {
  const [title, setTitle] = useState<string>()
  const { data, isLoading, isFetching } = useBlogsQuery(title)

  const isLoaded = !isLoading && !isFetching

  return (
    <Stack>
      <Input
        placeholder="Blog title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      {/* TODO: Render titles */}
      {isLoaded && (
        <ul>{data?.map(blog => <li key={blog.id}>{blog.title}</li>)}</ul>
      )}
    </Stack>
  )
}
