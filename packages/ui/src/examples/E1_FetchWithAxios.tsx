import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'

const BLOG_URL = `https://wsvv-api-staging.onrender.com/api/blogs?locale=tr`

export const FetcWithAxios = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(BLOG_URL)
        setBlogs(response.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    <Box>
      {/* Show only title of the blogs */}
      <ul>
      <li>nbr</li>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Box>
  )
}