import { FC } from 'react'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
} from '@chakra-ui/react'
import { ReCaptchaProvider } from 'next-recaptcha-v3'

import { NX_RECAPTCHA_SITE_KEY } from '@wsvvrijheid/secrets'

import { ArtModalProps } from './types'
import { ArtWithDetails } from '../ArtWithDetails'

export const ArtModal: FC<ArtModalProps> = ({ art, isOpen, onClose }) => {
  return (
    <ReCaptchaProvider useEnterprise reCaptchaKey={NX_RECAPTCHA_SITE_KEY}>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalBody>
            <ArtWithDetails art={art} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </ReCaptchaProvider>
  )
}
