import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

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
