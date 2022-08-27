import { useState } from 'react'

import {
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Box,
  Button,
  ModalFooter,
} from '@chakra-ui/react'
import { MergedStrapiModel } from '@wsvvrijheid/types'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'

import { TranslateAccordion } from './TranslateAccordion'
import {
  TranslateModel,
  TranslateModalProps,
  TranslationKey,
  Locales,
} from './types'

const simplifyModel = (model: Omit<TranslateModel, 'localizations'>) => ({
  ...model,
  image: model.images?.[0] || model.image,
})

const concatModelLocalizations = ({
  localizations,
  ...model
}: TranslateModel) => {
  const defaultModel = simplifyModel(model)

  const translations = localizations?.map(localization =>
    simplifyModel(localization as TranslateModel),
  )

  if (translations) {
    return [defaultModel, ...translations]
  }

  return [defaultModel]
}

export const TranslateModal = <T extends MergedStrapiModel>({
  isOpen,
  model,
  onApprove,
  onClose,
  onSave,
}: TranslateModalProps<T>) => {
  const [translationKey, setTranslationKey] = useState<TranslationKey>()
  const [step, setStep] = useState(0)

  const models = concatModelLocalizations(model)

  const accordionModels = models.map(model => {
    const missingTranslations = Object.keys(Locales).filter(
      l => l !== model.locale,
    ) as Locales[]

    return {
      ...model,
      missingTranslations,
    }
  })

  const handleTranslate = (key: TranslationKey) => {
    setStep(prev => prev + 1)
    setTranslationKey(key)
  }

  console.log('translationKey', translationKey)

  const handleReturn = () => {
    if (step === 0) onClose()
    else setStep(prev => prev - 1)
  }

  const handleSaveDraft = () => alert('Draft')

  const handleSendTranslation = () => alert('Sent')

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full">
          <ModalHeader>
            <Text size={'xl'} fontWeight={'bold'}>
              Translate
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === 0 && (
              <TranslateAccordion
                handleTranslate={handleTranslate}
                models={accordionModels}
              />
            )}
            {step === 1 && <Box>{translationKey}</Box>}
          </ModalBody>
          <ModalFooter borderTopWidth={1}>
            <HStack spacing={3}>
              <Button
                textColor={'white'}
                onClick={handleReturn}
                bg={'gray.400'}
                leftIcon={<AiOutlineArrowLeft />}
              >
                Return
              </Button>
              {step === 1 && (
                <>
                  <Button
                    onClick={handleSaveDraft}
                    colorScheme={'purple'}
                    leftIcon={<AiOutlineCheck />}
                  >
                    Save Draft
                  </Button>
                  <Button
                    onClick={handleSendTranslation}
                    colorScheme={'blue'}
                    leftIcon={<AiOutlineCheck />}
                  >
                    Send Translation
                  </Button>
                </>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
