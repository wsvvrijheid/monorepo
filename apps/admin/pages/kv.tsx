import { useEffect, useState } from 'react'

import {
  Button,
  Center,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  SimpleGrid,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  TagLeftIcon,
  Wrap,
} from '@chakra-ui/react'
import { useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { FaShareAlt } from 'react-icons/fa'

import {
  useCreatePostSentence,
  useDeletePostSentence,
  useGetPostSentences,
  useUpdatePostSentence,
} from '@wsvvrijheid/services'
import { RedisPost } from '@wsvvrijheid/types'
import { AdminLayout } from '@wsvvrijheid/ui'

const TestPage = () => {
  const [input, setInput] = useState('')
  const [value, setValue] = useState<RedisPost>()

  const queryClient = useQueryClient()

  const router = useRouter()

  const id = router.query.id ? Number(router.query.id) : 1

  useEffect(() => {
    setValue(`${id}::${input}::1`)
  }, [input, id])

  const onAddMutation = useCreatePostSentence()

  const onUpdateMutation = useUpdatePostSentence()

  const onDeleteMutation = useDeletePostSentence()

  const postSentencesQuery = useGetPostSentences(
    router.query.id ? Number(router.query.id) : 1,
  )

  return (
    <AdminLayout seo={{ title: 'Test' }}>
      <Stack>
        <Heading color={'initial'}>Vercel KV Example</Heading>
        <SimpleGrid columns={{ base: 1, lg: 2 }} gap={8} borderWidth={2} p={6}>
          <Stack p={2}>
            <FormControl>
              <Input
                value={input}
                placeholder="Sentence"
                onChange={e => setInput(e.target.value)}
              />
              {input && <FormHelperText>{value}</FormHelperText>}
            </FormControl>
            <Button
              onClick={() =>
                onAddMutation.mutate(
                  {
                    id,
                    value,
                  },
                  {
                    onSuccess: () => {
                      const cachePosts = queryClient.getQueryData<string[]>([
                        'kv-posts',
                        id,
                      ])

                      queryClient.setQueryData<string[]>(
                        ['kv-posts', id],
                        [...cachePosts, value],
                      )

                      setInput('')
                    },
                  },
                )
              }
            >
              Add item
            </Button>
          </Stack>
          <Wrap p={2}>
            {postSentencesQuery.data?.map((item: string, index: number) => {
              const id = Number(item.split('::')[0])
              const value = item.split('::')[1] as RedisPost
              const count = Number(item.split('::')[2])

              return (
                <Tag size={'lg'} key={item}>
                  <Center mr={2}>{count}</Center>
                  <TagLeftIcon
                    cursor={'pointer'}
                    as={FaShareAlt}
                    onClick={() => {
                      const newValue = `${id}::${value}::${
                        count + 1
                      }` as RedisPost
                      onUpdateMutation.mutate(
                        {
                          id,
                          index,
                          value: newValue,
                        },
                        {
                          onSuccess: () => {
                            const cachePosts = queryClient.getQueryData<
                              string[]
                            >(['kv-posts', id])

                            const newCachePosts = cachePosts.map((item, i) => {
                              if (i === index) {
                                return newValue
                              }

                              return item
                            })

                            queryClient.setQueryData<string[]>(
                              ['kv-posts', id],
                              newCachePosts,
                            )
                          },
                        },
                      )
                    }}
                  />
                  <TagLabel>{value}</TagLabel>
                  <TagCloseButton
                    onClick={() => {
                      const newValue = `${id}::${value}::${count}` as RedisPost

                      return onDeleteMutation.mutate(
                        {
                          id: Number(id),
                          value: newValue,
                        },
                        {
                          onSuccess: () => {
                            const cachePosts = queryClient.getQueryData<
                              string[]
                            >(['kv-posts', id])

                            const newCachePosts = cachePosts.filter(
                              item => item !== newValue,
                            )

                            queryClient.setQueryData<string[]>(
                              ['kv-posts', id],
                              newCachePosts,
                            )
                          },
                        },
                      )
                    }}
                  />
                </Tag>
              )
            })}
          </Wrap>
        </SimpleGrid>
      </Stack>
    </AdminLayout>
  )
}

export default TestPage
