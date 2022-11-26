import { Post, Localize } from '@wsvvrijheid/types'

import { WConfirmProps } from '../../components'

export type PostDetailModalProps = {
  localizePost: Localize<Post>
  isOpen: boolean
  onClose: () => void
  onDelete: (postId: number) => void
  onPublish: (postId: number) => void
  unPublish: (postId: number) => void
  onApprove: (postId: number) => void
  confirmState: Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>
}
