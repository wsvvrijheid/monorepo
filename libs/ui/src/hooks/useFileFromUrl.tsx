import { useEffect, useState } from 'react'

export const useFileFromUrl = (url?: string) => {
  const [imageFile, setImageFile] = useState<File>()

  useEffect(() => {
    const createFileFromUrl = async (url: string) => {
      ///fetch(url, { mode: 'cors' })
      console.log('burasi filefrom url in INFunctine')
      const response = await fetch('/api/file', {
        method: 'POST',
        body: url,
      })
      console.log(' RRRRRRR responce  ', response)
      const blob = await response.blob()
      console.log(' VVVVVv responce  ', blob)
      const file = new File([blob], 'image', { type: blob.type })
      // .then(res => res.blob())
      // .then(blob => {
      //   console.log('blob in useFileFromUrl  xxxxxxxxxxx  s ', blob)
      //   const file = new File([blob], 'image', { type: blob.type })
      //   return file
      // })

      // const response = await fetch(url, { mode: 'no-cors' })
      //   .then(res => res.blob())
      //   .then(blob => {
      //     const file = new File([blob], 'image', { type: blob.type })
      //     return file
      //   })
      setImageFile(file)
    }
    if (url) {
      createFileFromUrl(url)
    }
  }, [url])

  return imageFile
}
