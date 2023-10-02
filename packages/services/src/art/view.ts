import { useTimeout } from '@chakra-ui/react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useLocalStorage } from 'usehooks-ts'

import { API_URL } from '@wsvvrijheid/config'
import { useAuthContext } from '@wsvvrijheid/context'

import { useArtBySlug } from './getBySlug'
import { useRecaptchaToken } from '../common'

export const useViewArtMutation = () => {
  const queryClient = useQueryClient()
  const {
    locale,
    query: { slug },
  } = useRouter()

  const { data: art } = useArtBySlug()
  const { token } = useAuthContext()
  const recaptchaToken = useRecaptchaToken('view_art')

  const [artStorage, setArtStorage] = useLocalStorage<number[]>('view-art', [])

  const { mutate } = useMutation({
    mutationKey: ['view-art', art?.id],
    mutationFn: (id: number) =>
      axios.put(
        `${API_URL}/api/view-art/${id}`,
        { data: { recaptchaToken } },
        { headers: { ...(token && { Authorization: `Bearer ${token}` }) } },
      ),
    onSuccess: () => {
      art && setArtStorage([...(artStorage || []), art.id])
      queryClient.invalidateQueries(['art', locale, slug])
    },
  })

  useTimeout(() => {
    const isViewed = artStorage?.some(id => id === art?.id)

    if (art && !isViewed) {
      mutate(art.id)
    }
  }, 10 * 3000)
}
