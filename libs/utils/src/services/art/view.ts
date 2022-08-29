import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Art } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'react-use'

import { mutation } from '../../lib'
import { useArtBySlug } from './getBySlug'

export const viewArt = async (art: Art) =>
  mutation<Art>().put('api/arts', art.id, {
    data: { views: (art.views || 0) + 1 },
  })

export const useViewArtMutation = async () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { data: art } = useArtBySlug()

  const [artStorage, setArtStorage] = useLocalStorage<number[]>('view-art', [])

  const { mutate } = useMutation({
    mutationKey: ['viewart', art?.id],
    mutationFn: (art: Art) => viewArt(art),
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
