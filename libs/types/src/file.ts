export type FileFormatsType = 'large' | 'small' | 'medium' | 'thumbnail'

export interface FileInfoInput {
  name: string
  alternativeText: string
  caption: string
}

export type FileFormats<T> = {
  large: Omit<T, 'formats'>
  small: Omit<T, 'formats'>
  medium: Omit<T, 'formats'>
  thumbnail: Omit<T, 'formats'>
}

export type RawUploadFile = {
  id: number
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  formats: FileFormats<RawUploadFile>
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: string
  provider: string
  provider_metadata: any
  size: number
  updatedAt: string
  url: string
  width: number
}

export type UploadFile = {
  id: number
  alternativeText: string
  caption: string
  createdAt: string
  ext: string
  formats: FileFormats<UploadFile>
  hash: string
  height: number
  mime: string
  name: string
  previewUrl: string
  provider: string
  provider_metadata: any
  size: number
  updatedAt: string
  url: string
  width: number
}
