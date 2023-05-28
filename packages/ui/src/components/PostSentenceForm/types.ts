import { HashtagReturnType } from '@wsvvrijheid/types'

export type PostSentenceFormProps = {
  id: number
  hashtag: HashtagReturnType
}

export type PostSentenceFormItemProps = {
  id: number
  index: number
  sentence: string
  shareCount: number
  isPublished: boolean
}
