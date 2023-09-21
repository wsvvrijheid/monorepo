/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, ListItem, UnorderedList } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Blog } from '@wsvvrijheid/types'


const BLOG_URL = `${API_URL}/api/blogs?locale=tr`

const headers = { Authorization: `Bearer ${TOKEN}` }

const getBlogs = async () => {
  try {
    const res = await axios.get(`${BLOG_URL}`, { headers })
    if (res.status !== 200) throw new Error("Failed to fetch")

    return res.data.data
  } catch (error) {
    console.error("Error fetching data: ", error)
  }
}

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { locale } = useRouter()

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    getBlogs()
      .then(setBlogs)
      .catch(error => console.error("Error: ", error))
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter
  }, [])

  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      <UnorderedList>
        {blogs?.map((blog) => {
          return (<ListItem key={blog.id}>{blog.title}</ListItem>)
        })}
      </UnorderedList>

    </Box>
  )
}
