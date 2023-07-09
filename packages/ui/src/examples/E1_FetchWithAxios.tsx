/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import * as qs from 'qs'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Blog } from '@wsvvrijheid/types'

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { locale } = useRouter()

  const headers = {
    Authorization: 'Bearer ' + TOKEN,
  }

  const query = qs.stringify(
    { locale: 'tr' },
    {
      encodeValuesOnly: true, // prettify URL
    },
  )

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    axios
      .get(`https://api.wsvvrijheid.nl/api/blogs?${query}`, { headers })
      .then(response => {
        setBlogs(response.data.data)
      })
      .catch(error => console.log(error))
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter
  }, [])

  return (
    <Box>
      {blogs.map(blog => (
        <h1 key={blog.id}>{blog.title}</h1>
      ))}
    </Box>
  )
}
