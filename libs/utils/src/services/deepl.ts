import { StrapiLocale } from '@wsvvrijheid/types'
import axios from 'axios'

export const getTranslation = async (text: string, locale: StrapiLocale) => {
  const response = await axios.post('/api/translate', {
    text,
    locale,
  })

  return response.data
}
