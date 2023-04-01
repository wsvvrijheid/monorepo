import { useEffect, useState } from 'react'

import axios from 'axios'

import { API_URL } from '@wsvvrijheid/config'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const imageUrl = url.startsWith('http') ? url : `${API_URL}${url}`
      const response = await axios.get(`/api/images?url=${imageUrl}`, {
        responseType: 'blob',
      })
      const file = new File([response.data], 'image.png', {
        type: 'image/png',
      })
      setImageFile(file)
    }

    if (url) createFileFromUrl(url)
  }, [url])

  return imageFile
}
