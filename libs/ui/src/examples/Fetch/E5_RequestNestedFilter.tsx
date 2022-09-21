/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Stack } from '@chakra-ui/react'
import { API_URL, TOKEN } from '@wsvvrijheid/config'
import { request } from '@wsvvrijheid/utils'

export type RequestNestedFilterProps = {
  initialName: string
}

export const RequestNestedFilter: FC<RequestNestedFilterProps> = ({
  initialName,
}) => {
  const [blogs, setBlogs] = useState([])
  const [nameFilter, setNameFilter] = useState(initialName)

  useEffect(() => {
    // TODO: Fetch blogs by author name (blog.author.name) with nameFilter by using our custom request function
    // Changing nameFilter should trigger a new fetch.
    // How could you achieve it by using useEffect?
  }, [])

  // TODO Add Input to change nameFilter
  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
