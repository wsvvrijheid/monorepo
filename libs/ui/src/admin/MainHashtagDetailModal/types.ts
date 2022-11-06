import { Mention } from '@wsvvrijheid/types'

export type MainHashtagTypes = {
  mainhashtagDescription: string
  mainhashtagContent: string
  mainhashtagId: number
  mainhashtagImage: any
  mainhashtagTitle: string
  mainhashtagHashtag: string
  mainhashtagHashtagExtra: string
  mainhashtagDate: string
  mentions: Mention[] | null
  mainhashtagPublishedAt: string | null
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
      | 'hashtagextra'
      | 'date'
      | 'mention',
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
}
