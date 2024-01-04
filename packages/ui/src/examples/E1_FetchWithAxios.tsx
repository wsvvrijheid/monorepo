import { useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'

const BLOG_URL = `https://wsvv-api-staging.onrender.com/api/blogs?locale=tr`

// describe the specific data type for not return an error
interface Blog {
  id: number;
  title: string;
}

export const FetcWithAxios = () => {
  // specify the type of the Blog 
  const [blogs, setBlogs] = useState<Blog[]>([])

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
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </Box>
  )
}