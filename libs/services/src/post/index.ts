import { useMutation, useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { RedisPost } from '@wsvvrijheid/types'

type UpdateArgs = { id: number; index: number; value: RedisPost }
type CreateArgs = { id: number; value: RedisPost }
type DeleteArgs = { id: number; value: RedisPost }

export const updatePostSentences = async (args: UpdateArgs) => {
  const result = await axios.put<'OK'>('/api/kv/posts', args)

  return result.data
}

export const deletePostSentence = async (args: DeleteArgs) => {
  const params = new URLSearchParams()
  params.append('id', args.id.toString())
  params.append('value', args.value.toString())

  const result = await axios.delete<number>(
    `/api/kv/posts?${params.toString()}`,
  )

  return result.data
}

export const createPostSentence = async (args: CreateArgs) => {
  const result = await axios.post<number>('/api/kv/posts', args)

  return result.data
}

export const getPostSentences = async (id: number) => {
  const result = await axios.get<RedisPost[]>(`/api/kv/posts?id=${id}`)

  if (result.data.length) {
    console.log('result', result.data)
  }

  return result.data
}

export const useUpdatePostSentence = () =>
  useMutation({
    mutationKey: ['kv-posts-update'],
    mutationFn: updatePostSentences,
  })

export const useDeletePostSentence = () =>
  useMutation({
    mutationKey: ['kv-posts-delete'],
    mutationFn: deletePostSentence,
  })

export const useCreatePostSentence = () =>
  useMutation({
    mutationKey: ['kv-posts-create'],
    mutationFn: createPostSentence,
  })

export const useGetPostSentences = (id: number) =>
  useQuery({
    queryKey: ['kv-posts', id],
    queryFn: () => getPostSentences(id),
  })
