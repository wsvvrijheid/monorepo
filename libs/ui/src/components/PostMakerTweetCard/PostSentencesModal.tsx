import {
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react'
import { FaCogs } from 'react-icons/fa'

import { usePostContext } from '../PostProvider'
import { PostSentenceForm } from '../PostSentenceForm'

export const PostSentencesModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { post } = usePostContext()

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size={'6xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Manage Post Sentences</ModalHeader>
          <ModalBody>
            <PostSentenceForm id={post?.id || 0} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <IconButton
        aria-label="Manage sentences"
        icon={<FaCogs />}
        onClick={onOpen}
        variant={'outline'}
        isRound
      />
    </div>
  )
}
