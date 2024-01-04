/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

import { API_URL } from '@wsvvrijheid/config'

// https://wsvv-api-staging.onrender.com/api/blogs?locale=tr
// You can use local API_URL instead of the above url
// yarn --cwd apps/api dev to run the api locally (http://localhost:1337)
const BLOG_URL = "https://wsvv-api-staging.onrender.com/api/blogs?locale=tr"

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const { locale } = useRouter()

  useEffect(() => {
    const fetchBlogs = async() => {
      try {
        const response = await axios.get(BLOG_URL);
        setBlogs(response.data.data);
        console.log(response.data.data);
      }
      catch (error) {
        console.error("Error in fetching blogs", error);
      }
    }

    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter
    fetchBlogs();
  }, [locale])

  return (
  <Box>
    {blogs.map((blog, index) => (
    <div key={index}>{blog}</div>
  ))}
  <p>hello</p>
  </Box>
  )
}
