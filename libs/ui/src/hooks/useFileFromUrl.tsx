import { useEffect, useState } from 'react'

import axios from 'axios'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const response = await axios.get(`/api/images?url=${url}`, {
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
