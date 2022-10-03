/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC, useEffect, useState } from 'react'

import { Box, Stack, Input } from '@chakra-ui/react'
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
    ;(async () => {
      const response = await request({
        url: 'api/blogs',
        token: TOKEN,
        locale: 'tr',
        filters: { author: { username: { $contains: nameFilter } } },
      })
      const data = response?.data
      setBlogs(data)
    })()
  }, [nameFilter])
  const handleOnChange = (e: any) => {
    setTimeout(() => {
      setNameFilter(e.target.value)
    }, 1000)
  }

  return (
    <Box>
      <Input onChange={handleOnChange} placeholder="Edit author name..." />
      {blogs?.map(blog => (
        <h2 key={blog?.id}>{blog?.title}</h2>
      ))}
    </Box>
  )
}
