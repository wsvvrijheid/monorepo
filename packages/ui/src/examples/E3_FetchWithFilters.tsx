/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box } from '@chakra-ui/react'

import { strapiRequest } from '@wsvvrijheid/lib'

export type RequestFilterProps = {
  initialValue: string
}

export const FetchWithFilters: FC<RequestFilterProps> = ({ initialValue }) => {
  const [blogs, setBlogs] = useState([])
  const [titleFIlter, setTitleFilter] = useState(initialValue)

  useEffect(() => {
    // TODO: fetch blogs with filterValue by using strapiRequest
    // NOTE: Changing filteredValue should trigger a new fetch.
    // REF: https://docs.strapi.io/dev-docs/api/rest/filters-locale-publication#filtering
  }, [])

  // TODO Add Input to change titleFilter
  return <Box>{/* TODO: Show only title of the blogs */}</Box>
}
