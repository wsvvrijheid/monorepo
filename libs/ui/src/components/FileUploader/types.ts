import React from 'react'

export type FileUploaderProps = {
  setImages: React.Dispatch<React.SetStateAction<Blob[]>>
  maxSize?: number
  images: Array<Blob>
}
