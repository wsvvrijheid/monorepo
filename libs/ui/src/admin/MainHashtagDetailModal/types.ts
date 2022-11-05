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
  onDelete: (artId: number) => void
  onSave: (
    artId: number,
    data: string,
    updateValue:
      | 'content'
      | 'description'
      | 'hashtag'
      | 'title'
      | 'hashtagextra'
      | 'date',
  ) => void
  onPublish: (artId: number) => void
  unPublish: (artId: number) => void
}
