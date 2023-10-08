/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, ListItem, UnorderedList } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog, StrapiModel } from '@wsvvrijheid/types'

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    // TODO: fetch blogs with strapiRequest by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
    strapiRequest<Blog>({ endpoint: "blogs" })
      .then(data => {
        setBlogs(data.data)
      })
  }, [])

  return <Box>
    {/* TODO: Show only title of the blogs */}
    <UnorderedList>
      {blogs?.map((blog) => {
        return (<ListItem key={blog.id}>{blog.title}</ListItem>)
      })}
    </UnorderedList>
  </Box>
}
