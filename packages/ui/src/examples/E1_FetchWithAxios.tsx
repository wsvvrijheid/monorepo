/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'

const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState([])
  const { locale } = useRouter()

  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN (Authorization header with Bearer token)
    // NOTE: Not every locale may have a blog, so you may need to change the locale to tr
    // REF: https://docs.strapi.io/dev-docs/plugins/i18n#getting-localized-entries-with-the-locale-parameter
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
