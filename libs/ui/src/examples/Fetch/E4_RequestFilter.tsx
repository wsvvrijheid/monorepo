/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { request } from '@wsvvrijheid/utils'

export type RequestFilterProps = {
  initialValue: string
}

export const RequestFilter: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [titleFilter, setTitleFilter] = useState(initialValue)

  const getBlogs = async () => {
    try {
      // const { data } = await fetcher(API_TOKEN)(BLOG_URL)
      const { data } = await request({ url: 'api/blogs' })
      console.log(data)
      setBlogs(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // TODO: fetch blogs with filterValue by using our custom request function
    // Changing filteredValue should trigger a new fetch.
    // How could you achieve it by using useEffect?
    getBlogs()
  }, [titleFilter])

  // TODO Add Input to change titleFilter
  return (
    <Box>
      {/* TODO: Show only title of the blogs */}
      {/* <button onClick={e => setTitleFilter("Changed")}>Click here to fetch data</button> */}
      <input type="text" onChange={e => setTitleFilter(e.target.value)} />
      {blogs
        .map(x => x['title'])
        .filter(y => y.includes(titleFilter))
        .map(y => (
          <Box>{y}</Box>
        ))}
    </Box>
  )
}
