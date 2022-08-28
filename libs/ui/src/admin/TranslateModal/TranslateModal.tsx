import { useState } from 'react'

import {
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Box,
  Button,
  ModalFooter,
  Accordion,
} from '@chakra-ui/react'
import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'
import { isEmpty } from 'lodash'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'

import { TranslateAccordionItem } from './TranslateAccordionItem'
import {
  DefaultTranslatableModel,
  TranslateModalProps,
  TranslationKey,
  LocalizedModel,
} from './types'

const mapModelLocalization = <T extends StrapiTranslatableModel>({
  localizations,
  ...model
}: DefaultTranslatableModel<T>) => {
  const defaultLocalizedModel = {
    [model.locale]: {
      ...model,
      image: model.images?.[0] || model.image,
    },
  } as LocalizedModel<T>

  const localizedModels = localizations?.reduce((acc, localization) => {
    return {
      ...acc,
      [localization.locale]: localization,
    }
  }, {} as LocalizedModel<T>)

  if (!isEmpty(localizedModels)) {
    return {
      ...defaultLocalizedModel,
      ...localizedModels,
    }
  }

  return defaultLocalizedModel
}

export const TranslateModal = <T extends StrapiTranslatableModel>({
  isOpen,
  model,
  onApprove,
  onClose,
  onSave,
}: TranslateModalProps<T>) => {
  const [translationKey, setTranslationKey] = useState<TranslationKey>()
  const [step, setStep] = useState(0)

  const locales = ['tr', 'en', 'nl'] as StrapiLocale[]

  const localizedModels = mapModelLocalization<T>(model)

  const accordionModels = Object.values(localizedModels).map(model => {
    const missingTranslations = locales.filter(
      locale =>
        locale !== model.locale &&
        localizedModels[locale]?.status !== 'approved',
    ) as StrapiLocale[]

    return {
      ...model,
      missingTranslations,
    }
  })

  const handleTranslate = (key: TranslationKey) => {
    setStep(prev => prev + 1)
    setTranslationKey(key)
  }

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
          <ModalHeader fontSize="xl" fontWeight="bold">
            Translate
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === 0 && (
              <Accordion size={'lg'} allowToggle allowMultiple defaultIndex={0}>
                {accordionModels.map(model => (
                  <TranslateAccordionItem
                    {...model}
                    handleTranslate={handleTranslate}
                  />
                ))}
              </Accordion>
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
