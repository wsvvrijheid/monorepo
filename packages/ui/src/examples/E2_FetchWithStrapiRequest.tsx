/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { strapiRequest } from '@wsvvrijheid/lib';
import { Blog } from '@wsvvrijheid/types';


export const FetchWithStrapiRequest = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    // TODO: fetch blogs with strapiRequest by using the API_URL and PUBLIC_TOKEN
    // Remember that fetcher is a wrapper around axios that adds the token and api url to the request
    const locale = 'tr';

    const fetchBlogs = async () => {
      try {
        const response = await strapiRequest<Blog>({
          endpoint: 'blogs',
          locale
        });

        const result: any = response?.data ?? [];
        setBlogs(result);
      } catch (error: any) {
        console.error(error);
      }
    };

    fetchBlogs();
  }, [])

  return <Box>{/* TODO: Show only title of the blogs */}
    <h1>Blog titles : </h1>
    {blogs.map(blog => <p key={blog.id}>{blog.title}</p>)}
  </Box>
}
