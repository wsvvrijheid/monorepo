import { Art } from '@wsvvrijheid/types'

export type ArtModalProps = {
  art: Art
  isOpen: boolean
  onClose: () => void
}
