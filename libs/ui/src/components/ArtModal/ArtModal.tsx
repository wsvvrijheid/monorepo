import { FC } from 'react'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
} from '@chakra-ui/react'
import { Art } from '@wsvvrijheid/types'

import { ArtWithDetails } from '../ArtWithDetails'

export type ArtModalProps = {
  art: Art
  isOpen: boolean
  onClose: () => void
}

export const ArtModal: FC<ArtModalProps> = ({ art, isOpen, onClose }) => {
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalBody>
            <ArtWithDetails art={art} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
