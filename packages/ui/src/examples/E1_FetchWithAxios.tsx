/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, OrderedList, ListItem, Heading } from '@chakra-ui/react'
import { useRouter } from 'next/router'

// import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import axios from 'axios'

const API_URL = 'https://api.wsvvrijheid.nl'
const BLOG_URL = `${API_URL}/api/blogs` // https://api.wsvvrijheid.nl/api/blogs?locale=tr

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState([])
  const { locale } = useRouter()

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter

    async function getBlogs() {
      await axios
        .get(BLOG_URL, {
          baseURL: API_URL,
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
          params: { locale: 'tr' },
        })
        .then(response => setBlogs(response.data.data))
        .catch(err => console.log(err))
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
