import { useEffect, useState } from 'react'

import axios from 'axios'

import { ASSETS_URL } from '@wsvvrijheid/config'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const imageUrl = url.startsWith('http') ? url : `${ASSETS_URL}${url}`
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
export const useFileVideoFromUrl = (url?: string) => {
  const [videoFile, setVideoFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      const videoUrl = url.startsWith('http') ? url : `${ASSETS_URL}${url}`
      const response = await axios.get(`/api/videos?url=${videoUrl}`, {
        responseType: 'blob',
      })
      const file = new File([response.data], 'video.mp4', {
        type: 'video/mp4',
      })
      setVideoFile(file)
    }

    if (url) createFileFromUrl(url)
  }, [url])

  return videoFile
}
