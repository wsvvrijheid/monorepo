import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { MentionUserData } from '@wsvvrijheid/types'

export const lookupTwitterUsers = async (
  q?: string,
): Promise<MentionUserData[]> => {
  if (!q) return []

  const response = await axios(`${API_URL}/api/mentions/search?q=${q}`, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  })
  const rawData = response.data as MentionUserData[]

  return rawData.sort((a, b) => b.followers_count - a.followers_count)
}

export const useLookupTwitterUsers = (q?: string) => {
  console.log('q', q)

  return useQuery({
    queryKey: ['mentions-search', q],
    queryFn: () => lookupTwitterUsers(q),
    enabled: q?.length ? q.length > 3 : false,
    keepPreviousData: true,
  })
}
