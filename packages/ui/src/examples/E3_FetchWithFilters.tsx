/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, OrderedList, ListItem, Input } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog } from '@wsvvrijheid/types'

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState(initialValue)

  useEffect(() => {
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
    // TODO: Fetch blogs with by providing `title` filter to strapiRequest (title: { $containsi: title })
    // NOTE: Changing `title` should trigger a new fetch.
    // BONUS: You can play by using other arguments of strapiRequest (sort, populate,  fields etc).

    async function getBlogs() {
      await strapiRequest<Blog>({
        endpoint: 'blogs',
        filters: {
          title: { $containsi: title },
        },
        sort: ['updatedAt:asc'],
      }).then((response: any) => {
        setBlogs(response.data)
      })
    }
    getBlogs()
  }, [title])

  const handleChange = (e: any) => setTitle(e.target.value)

  return (
    <Box boxShadow="lg" p="5">
      {/* TODO: Show only title of the blogs */}
      {/* TODO Add Input to change titleFilter */}

      <Input
        value={title}
        onChange={handleChange}
        placeholder="Title filter"
        my={2}
      />

      <OrderedList>
        {blogs.map(({ id, title }) => (
          <ListItem key={id}>{title}</ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}
