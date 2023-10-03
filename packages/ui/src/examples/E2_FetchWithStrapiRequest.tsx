/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, OrderedList, ListItem } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'
import { Blog } from '@wsvvrijheid/types'

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with strapiRequest by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request

    async function getBlogs() {
      await strapiRequest<Blog>({
        endpoint: 'blogs',
      }).then(response => {
        setBlogs(response.data)
      })
    }
    getBlogs()
  }, [])

  return (
    <Box boxShadow="lg" p="5">
      {/* TODO: Show only title of the blogs */}

      <OrderedList>
        {blogs.map(({ id, title }) => (
          <ListItem key={id}>{title}</ListItem>
        ))}
      </OrderedList>
    </Box>
  )
}
