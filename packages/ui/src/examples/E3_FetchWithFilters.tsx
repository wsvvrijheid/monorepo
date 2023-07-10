/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'
import axios from 'axios'
import qs from 'qs'

import { strapiRequest } from '@wsvvrijheid/lib'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Blog } from '@wsvvrijheid/types'

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [titleFilter, setTitleFilter] = useState(initialValue)

  const query = qs.stringify(
    {
      filters: {
        title: {
          $startsWith: titleFilter,
        },
      },
      locale: "tr",
      sort: ['title:desc'],
    },
    {
      encodeValuesOnly: true, // prettify URL
    },
  )

  // const API_URL = `https://api.wsvvrijheid.nl/api/blogs?${query}`

  // const fetcher = (API_URL: string, token: string | undefined) => {
  //   const headers = {
  //     Authorization: 'Bearer ' + token,
  //   }
  //   axios
  //     .get(API_URL, { headers })
  //     .then(response => setBlogs(response.data.data))
  //     .catch(err => console.log(err))
  // }

  const inputHandler = (e: any) => {
    console.log("e.target.value:" + e.target.value);
    
    setTitleFilter(e.target.value)
  }

  useEffect(() => {

    const fetchData = async ()=>{
      const response = await strapiRequest<Blog>({
        url: 'api/blogs',
        filters: {
          title: {
            $startsWith: titleFilter,
          },
        },
        // locale: "tr",
        // sort: ['title:desc'],
      });
      setBlogs(response.data)
      console.log(response);
    }
   
    fetchData()
    
    // fetcher(API_URL, TOKEN)
    // TODO: fetch blogs with filterValue by using strapiRequest
    // NOTE: Changing filteredValue should trigger a new fetch.
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
    // BONUS: You can play by using other arguments of strapiRequest to sort, populate, to use fields etc.
  }, [titleFilter])

  // TODO Add Input to change titleFilter
  return <Box>
    <label htmlFor="search">Serach Blog By Title</label>
    <input name="search" id="search" type="text" value={titleFilter} onChange={(e)=>inputHandler(e)}></input>
    {blogs.map(blog => (
        <h1 key={blog.id}>{blog.title}</h1>
      ))}
    
  </Box>
}
