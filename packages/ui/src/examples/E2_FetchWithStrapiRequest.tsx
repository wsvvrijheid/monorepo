import React, { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'

const BLOG_URL = `https://wsvv-api-staging.onrender.com/api/blogs?locale=tr`
const PUBLIC_TOKEN = '2ff0613e2f32eae88e6dbdb8f806d8b1bdbb7fab7b1b9c2f693013220fceae7423a1eb8fdf06938c3bd1afd8e695364e883434d714b223b0a2fb585fcd06432f105d80ff90be73f59d2fc4690919c8737e75b0f786b19f4cc6454e638ea77cefe3675d592580eb77656dcfcdb8c1042d599313e297012703ebf3ecf1d6e30603'

interface Blog {
  id: number;
  title: string;
}

export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState<Blog[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blogs with strapiRequest by using the API_URL and PUBLIC_TOKEN
        const response = await strapiRequest({
          method: 'GET',
          url: BLOG_URL,
          headers: {
            Authorization: `Bearer ${PUBLIC_TOKEN}`,
          },
        })


        if ('data' in response.data) {
          setBlogs(response.data.data as Blog[])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box>
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Box>
  )
}
