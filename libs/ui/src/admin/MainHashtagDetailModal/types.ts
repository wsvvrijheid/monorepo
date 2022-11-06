import { Mention, Post } from '@wsvvrijheid/types'

export type MainHashtagTypes = {
  mainhashtagDescription: string
  mainhashtagContent: string
  mainhashtagId: number
  mainhashtagImage: Blob[]
  mainhashtagTitle: string
  mainhashtagHashtag: string
  mainhashtagHashtagExtra: string
  mainhashtagDate: string
  mentions: Mention[] | null
  mainhashtagMentions: Mention[] | null
  mainhashtagPublishedAt: string | null
  posts: Post
  isOpen: boolean
  onClose: () => void
  onDelete: (maninhashtagId: number) => void
  onSave: (
    artId: number,
    data: string,
    updateValue:
      | 'content'
      | 'description'
      | 'hashtag'
      | 'title'
      | 'hashtagExtra'
      | 'date'
      | 'image'
      | 'mentions',
  ) => void
  onPublish: (maninhashtagId: number) => void
  unPublish: (maninhashtagId: number) => void
}
export type CreateMainHashtagFormFieldValues = {
  title: string
  description: string
  content: string
  hashtag: string
  extrahashtag?: string
  date: string
  mentions?: {
    label: string
    value: string
  }[]
  image: Blob[]
}
