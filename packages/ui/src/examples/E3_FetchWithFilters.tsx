/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Input } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'
import { API_URL } from '@wsvvrijheid/config/src/constants';
import { Blog } from '@wsvvrijheid/types';


export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [word, setWord] = useState(initialValue ?? '')
  const locale = 'tr';
  const query: any = word.length > 2 ? {
    endpoint: 'blogs', sort: ['publishedAt:desc'], locale,
    filters: { title: { $containsi: word } }
  } :
    {
      endpoint: 'blogs', sort: ['publishedAt:desc'], locale
    };

  let timerID: any = undefined;
  const changeWord = (keyword: string) => {
    if (keyword.length < 2) {
      if (timerID) {
        clearTimeout(timerID);
        timerID = undefined;
        setWord('');
      }
      return;
    }
    timerID = setTimeout(() => {
      setWord(keyword);
    }, 400);
  }

  useEffect(() => {
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
    // TODO: Fetch blogs with by providing `title` filter to strapiRequest (title: { $containsi: title })
    // NOTE: Changing `title` should trigger a new fetch.
    // BONUS: You can play by using other arguments of strapiRequest (sort, populate,  fields etc).
    const fetchBlogs = async () => {
      try {
        const response = await strapiRequest<Blog>(query);
        const result: any = response?.data ?? [];
        setBlogs(result);
      } catch (error: any) {
        console.error(error);
      }
    };


    fetchBlogs();
  }, [word])

  // TODO Add Input to change titleFilter
  return <Box>{/* TODO: Show only title of the blogs */}
    <h1>Filter (at least 3 letters):</h1>
    <Input type="text" onChange={e => changeWord(e.target.value)} />
    <h1>Blog titles {word.length > 2 ? 'includes ' + word : ''} : </h1>
    {blogs.map(blog => <p key={blog.id}>{blog.title}</p>)}
  </Box>
}
