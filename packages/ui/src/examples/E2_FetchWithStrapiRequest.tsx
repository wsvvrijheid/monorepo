/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'
import qs from 'qs'

import { strapiRequest } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Blog } from '@wsvvrijheid/types'

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  const query = qs.stringify(
    { locale: 'tr' },
    {
      encodeValuesOnly: true, // prettify URL
    },
  )

  const API_URL = `https://api.wsvvrijheid.nl/api/blogs?${query}`

  const fetcher = (API_URL: string, token: string | undefined) => {
    const headers = {
      Authorization: 'Bearer ' + token,
    }
    axios
      .get(API_URL, { headers })
      .then(response => setBlogs(response.data.data))
      .catch(err => console.log(err))
  }

  useEffect(() => {
    // TODO: fetch blogs with fetcher by using the API_URL and TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
    fetcher(API_URL, TOKEN)
  }, [])

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      {blogs.map(blog => (
        <h1 key={blog.id}>{blog.title}</h1>
      ))}
    </Box>
  )
}
