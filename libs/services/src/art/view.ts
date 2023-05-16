import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

import { useAuthContext } from '@wsvvrijheid/context'
import { Mutation } from '@wsvvrijheid/lib'
import { Art, ArtUpdateInput } from '@wsvvrijheid/types'

import { useArtBySlug } from './getBySlug'

export const viewArt = async (art: Art, token: string) => {
  const body = { views: (art.views || 0) + 1, token }

  return Mutation.put<Art, ArtUpdateInput>('api/arts', art.id, body, token)
}

export const useViewArtMutation = async () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { data: art } = useArtBySlug()
  const { token } = useAuthContext()

  const [artStorage, setArtStorage] = useLocalStorage<number[]>('view-art', [])

  const { mutate } = useMutation({
    mutationKey: ['viewart', art?.id],
    mutationFn: (art: Art) => viewArt(art, token as string),
    onSuccess: () => {
      art && setArtStorage([...(artStorage || []), art.id])
      queryClient.invalidateQueries(['art', locale, slug])
    },
  })

  useTimeout(() => {
    const isViewed = artStorage?.some(id => id === art?.id)

    if (art && !isViewed) {
      mutate(art)
    }
  }, 10 * 1000)
}
