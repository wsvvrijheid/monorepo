import { useEffect, useState } from 'react'

import axios from 'axios'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string, filename = 'file') => {
      const response = await axios.get(url, { responseType: 'blob' })
      setImageFile(response.data)
    }

    if (url) createFileFromUrl(url)
  }, [url])

  return imageFile
}
