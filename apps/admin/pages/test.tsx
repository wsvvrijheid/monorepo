import React from 'react'

import { Badge, Button, HStack, Stack } from '@chakra-ui/react'
import { useMutation, useQuery } from '@tanstack/react-query'

import { AdminLayout } from '@wsvvrijheid/ui'

const TestPage = () => {
  const listItems = useQuery({
    queryKey: ['listItems'],
    queryFn: () => fetch('/api/kv/list').then(res => res.json()),
  })

  const onAdd = useMutation({
    mutationKey: ['addItem'],
    mutationFn: () =>
      fetch('/api/kv/list', {
        method: 'POST',
        body: `1::2::0::${Math.random()}`,
      }),
    onSuccess: () => listItems.refetch(),
  })

  // const onUpdate = useMutation({
  //   mutationKey: ['addItem'],
  //   mutationFn: ({ index, value }) =>
  //     fetch('/api/kv/list', {
  //       method: 'PUT',
  //       body: JSON.stringify({ index, value }),
  //     }),
  //   onSuccess: () => listItems.refetch(),
  // })

  const handleIncrease = (id: string) => {
    const item = listItems.data?.result?.find(item => item.includes(id))
    if (!item) return
  }

  return (
    <AdminLayout seo={{ title: 'Test' }}>
      <Button onClick={() => onAdd.mutate()}>Add item</Button>
      <Stack>
        {listItems.data?.result?.map((item: string, index: number) => {
          const [id, value, count] = item.split('::')

          return (
            <HStack
              key={item}
              cursor={'pointer'}
              onClick={() => handleIncrease(id)}
            >
              <div>{value}</div>
              <Badge>{count}</Badge>
            </HStack>
          )
        })}
      </Stack>
    </AdminLayout>
  )
}

export default TestPage
