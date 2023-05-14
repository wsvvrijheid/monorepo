import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { UserV1 } from 'twitter-api-v2'

import { API_URL } from '@wsvvrijheid/config'
import { TOKEN } from '@wsvvrijheid/secrets'
import { Mention, StrapiLocale } from '@wsvvrijheid/types'

// ?locale=${locale}&filters[hashtags][slug][$eqi]=${slug}
export const fetchMentions = createAsyncThunk(
  'post/mentions',

  async (payload: {
    locale: StrapiLocale
    slug: string
  }): Promise<Mention[]> => {
    const response = await axios(
      `${API_URL}/api/mentions?locale=${payload?.locale}&filters[hashtags][slug][$eq]=${payload?.slug}`,
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      },
    )
    const rawData = response.data

    return rawData.data as Mention[]
  },
)

export const searchMentions = createAsyncThunk(
  'post/searchedMentions',
  async (value: string) => {
    const response = await axios(`${API_URL}/api/mentions/search?q=${value}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
    const rawData = response.data as UserV1[]

    return rawData.sort((a, b) => b.followers_count - a.followers_count)
  },
)
