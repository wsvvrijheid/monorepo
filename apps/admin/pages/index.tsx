/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'

import { Input, SimpleGrid, Stack, Textarea } from '@chakra-ui/react'
import { AdminLayout, OgImage } from '@wsvvrijheid/ui'

const Index = () => {
  const [title, setTitle] = useState('Title')
  const [text, setText] = useState('Description')

  return (
    <AdminLayout title="Dashboard">
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        gap={8}
        bg={'white'}
        shadow={'md'}
        p={4}
      >
        <Stack>
          <Input value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea value={text} onChange={e => setText(e.target.value)} />
        </Stack>
        <OgImage title={title} text={text} />
      </SimpleGrid>
    </AdminLayout>
  )
}

export default Index
