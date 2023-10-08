/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, ListItem, UnorderedList } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog } from '@wsvvrijheid/types'

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [title, setTitle] = useState<string>(initialValue)

  useEffect(() => {
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
    // TODO: Fetch blogs with by providing `title` filter to strapiRequest (title: { $containsi: title })
    strapiRequest<Blog>({ endpoint: "blogs", filters: { title: { $eq: `The Hero` } } })
      .then(data => setBlogs(data.data))
    // NOTE: Changing `title` should trigger a new fetch.
    // BONUS: You can play by using other arguments of strapiRequest (sort, populate,  fields etc).
  }, [])

  // TODO Add Input to change titleFilter
  return <Box>{/* TODO: Show only title of the blogs */}
    <UnorderedList>
      {blogs?.map((blog) => {
        return (<ListItem key={blog.id}>{blog.title}</ListItem>)
      })}
    </UnorderedList>
  </Box>
}
