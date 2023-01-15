import { useEffect, useState } from 'react'

import axios from 'axios'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string, filename = 'file') => {
      //console.log('come to createFile function 000000 url', url)

      const response = await axios.get(url, { responseType: 'blob' })
      console.log('in useFileForm image 1', response.data)
      setImageFile(response.data)
    }

    if (url) createFileFromUrl(url)
  }, [url])

  return imageFile
}
