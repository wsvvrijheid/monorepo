/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import axios from 'axios'

const BLOG_URL = `${API_URL}/api/blogs` // https://api.samenvvv.nl/api/blogs
const API_TOKEN = TOKEN

export const FetcAxios = () => {
  const [blogs, setBlogs] = useState([])

  const getBlogs = async () => {
    try {
      const { data } = await axios.get(BLOG_URL);
      setBlogs(data);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    // TODO: fetch blogs with axios by using the API_URL and TOKEN
    getBlogs()
  }, [])

  

  return (<Box>
    {/* TODO: Show only title of the blogs */}
    {blogs.map(x => <Box>{x["title"]}</Box>)}
    </Box>)
}
