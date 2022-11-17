import { useMemo, useState } from 'react'

import {
  Accordion,
  Box,
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import { StrapiLocale, StrapiTranslatableModel } from '@wsvvrijheid/types'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'

import { TranslateAccordionItem } from './TranslateAccordionItem'
import { TranslateForm } from './TranslateForm'
import { TranslateModalProps, TranslationKey } from './types'
import { mapModelLocalization } from './utils'

export const TranslateModal = <T extends StrapiTranslatableModel>({
  isOpen,
  model,
  onApprove,
  onClose,
  onSave,
}: TranslateModalProps<T>) => {
  const [translationKey, setTranslationKey] = useState<TranslationKey>()
  const [step, setStep] = useState(0)

  const { modelsWithMissingTranslations, localizedModels } = useMemo(() => {
    const locales = ['tr', 'en', 'nl'] as StrapiLocale[]

    // From model to object with its localizations { tr: data, en: data, nl: data }
    const localizedModels = mapModelLocalization<T>(model)

    const modelsWithMissingTranslations = Object.values(localizedModels).map(
      model => {
        // Find missing translations for the current model
        // Approved localizations are not included in the missing translations
        const missingTranslations = locales.filter(locale => {
          return (
            locale !== model.locale &&
            localizedModels[locale]?.translationStatus !== 'approved'
          )
        }) as StrapiLocale[]

        return {
          ...model,
          missingTranslations,
        }
      },
    )

    return { modelsWithMissingTranslations, localizedModels }
  }, [model])

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
          <ModalHeader
            fontSize="xl"
            fontWeight="bold"
            borderBottomWidth={step > 0 ? 1 : 0}
          >
            {step > 0 && (
              <IconButton
                aria-label="return"
                icon={<AiOutlineArrowLeft />}
                onClick={handleReturn}
                variant="ghost"
                mr={2}
                size="sm"
              />
            )}
            Translate
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {step === 0 && (
              <Accordion size={'lg'} allowToggle allowMultiple defaultIndex={0}>
                {modelsWithMissingTranslations.map(model => (
                  <TranslateAccordionItem
                    {...model}
                    handleTranslate={handleTranslate}
                  />
                ))}
              </Accordion>
            )}
            {step === 1 && translationKey && (
              <TranslateForm
                translationKey={translationKey}
                localizedModels={localizedModels}
              />
            )}
          </ModalBody>
          {step === 1 && (
            <ModalFooter borderTopWidth={1}>
              <HStack spacing={3}>
                <Button
                  display={{ base: 'none', lg: 'flex' }}
                  textColor={'white'}
                  onClick={handleReturn}
                  bg={'gray.400'}
                  leftIcon={<AiOutlineArrowLeft />}
                >
                  Return
                </Button>
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
              </HStack>
            </ModalFooter>
          )}
        </ModalContent>
      </Modal>
    </Box>
  )
}
