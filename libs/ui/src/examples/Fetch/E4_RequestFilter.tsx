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
  const [titleFIlter, setTitleFilter] = useState(initialValue)

  useEffect(() => {
    // TODO: fetch blogs with filterValue by using our custom request function
    // Changing filteredValue should trigger a new fetch.
    // How could you achieve it by using useEffect?
  }, [])

  // TODO Add Input to change titleFilter
  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
