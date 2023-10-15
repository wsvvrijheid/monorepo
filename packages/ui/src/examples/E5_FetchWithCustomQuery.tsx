/* eslint-disable @typescript-eslint/no-unused-vars */

import { useState } from 'react'

import { Input, ListItem, Spinner, Stack, UnorderedList } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog } from '@wsvvrijheid/types'

const fetchBlogs = async (title?: string) => {
  // TODO: Use strapiRequest
  // TODO: Add title filter
  // Return blogs array instead of StrapiCollectionResponse ({data, meta})
  return strapiRequest<Blog>({ "endpoint": "blogs", locale: "tr", filters: { title: { $containsi: title } } })
    .then(res => res.data)
    .catch(err => console.error('Error fetching: ', err))
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
      <Input placeholder="Blog title" value={title || ''}
        onChange={(e) => setTitle(e.target.value)} />
      {/* TODO: Render titles */}
      {isLoaded ?
        <UnorderedList>
          {data?.map((blog) => {
            return (<ListItem key={blog.id}>{blog.title}</ListItem>)
          })}
        </UnorderedList>
        :
        <>
          <Spinner />
        </>
      }
    </Stack>
  )
}
