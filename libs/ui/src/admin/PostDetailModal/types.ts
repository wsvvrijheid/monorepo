import { Post, Localize } from '@wsvvrijheid/types'

export type PostDetailModalProps = {
  localizePost: Localize<Post>
  isOpen: boolean
  onClose: () => void
  onDelete: (postId: number) => void
  onPublish: (postId: number) => void
  unPublish: (postId: number) => void
  onApprove: (postId: number) => void
}
