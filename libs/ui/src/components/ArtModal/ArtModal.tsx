import { FC } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Box,
} from '@chakra-ui/react'

import { ArtModalProps } from './types'
import { ArtWithDetails } from '../ArtWithDetails'

export const ArtModal: FC<ArtModalProps> = ({ art, isOpen, onClose }) => {
  console.log('data art >>>', art)
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
