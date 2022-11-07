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
  posts?: Post[]
  isOpen: boolean
  onClose: () => void
  onDelete: (maninhashtagId: number) => void
  onSave: (
    mainhashtagId: number,
    data: string,
    updateValue:
      | 'title'
      | 'content'
      | 'description'
      | 'hashtag'
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
export type EditButtonsProps = {
  handleSave: (text: string) => void
  cancelEdit: (text: string) => void
  task: string
}
export type MentionItemProps = {
  mention: Mention[]
  onRemoveItem: (id: number) => void
}
