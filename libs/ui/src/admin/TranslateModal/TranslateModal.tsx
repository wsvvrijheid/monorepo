import { FC, useState } from 'react'

import {
  Avatar,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  Stack,
  Box,
  Flex,
  SimpleGrid,
  Button,
  Textarea,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  VStack,
  ModalFooter,
  Badge,
  ButtonGroup,
} from '@chakra-ui/react'

import { TranslateForm } from './TranslateForm'
import { TranslateModalTypes } from './types'
import { BsTranslate } from 'react-icons/bs'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { StrapiLocale } from '@wsvvrijheid/types'
import { AiOutlineArrowLeft, AiOutlineCheck } from 'react-icons/ai'

export const TranslateModal: FC<TranslateModalTypes> = ({
  onApprove,
  isOpen,
  onClose,
  onSave,
  mode = 'preview',
}) => {
  const [lang, setLang] = useState<StrapiLocale>('tr')
  const [isEditing, setIsEditing] = useState(mode === 'edit' ? true : false)

  const handleSave = () => {
    setIsEditing(false)
  }

  const LanguageNames: Record<StrapiLocale, string> = {
    en: 'English',
    nl: 'Nederlands',
    tr: 'Türkçe',
  }

  // const item = {
  //   id: '1',
  //   translate: {
  //     en: {
  //       title: 'Eng Title',
  //       description: 'Eng description',
  //       content: 'Eng content',
  //       status: 'approved',
  //     },
  //     nl: {
  //       title: 'Nl Title',
  //       description: 'Nl description',
  //       content: 'Nl content',
  //       status: 'pending',
  //     },
  //   },
  //   title: 'Tr Title',
  //   description: 'Tr description',
  //   content: 'Tr content',
  // }

  const handleOnEditMode = (l: StrapiLocale) => {
    setLang(l)
    setIsEditing(p => !p)
  }

  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
          <ModalHeader borderBottomWidth={1}>
            <Text size={'xl'} lineHeight={7} fontWeight={'bold'}>
              Translate
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box borderColor="gray.300" borderWidth={1} p={0} m={0}>
              <Accordion size={'lg'} allowToggle allowMultiple>
                <AccordionItem>
                  <HStack
                    justify={'space-evenly'}
                    borderBottomWidth={1}
                    padding={2}
                    bg={'gray.50'}
                  >
                    <HStack flex={'1'} justify={'space-evenly'}>
                      <HStack spacing={2} flex={'1'}>
                        <LanguageSwitcher
                          defaultLocale={lang}
                          onLanguageSwitch={locale => alert(locale)}
                        />
                        <Text size={'lg'} fontWeight="bold">
                          {LanguageNames[lang]} title
                          <Badge
                            textTransform={'uppercase'}
                            variant="outline"
                            ml="2"
                            colorScheme="green"
                          >
                            APPROVED
                          </Badge>
                        </Text>
                      </HStack>

                      <ButtonGroup gap="3">
                        {Object.entries(LanguageNames).map(l => {
                          if (l[0] === 'tr') {
                            return null
                          }
                          return (
                            <Button
                              textTransform={'uppercase'}
                              leftIcon={<BsTranslate />}
                              colorScheme={l[0] === 'nl' ? 'orange' : 'purple'}
                              variant="outline"
                              onClick={() =>
                                handleOnEditMode(l[0] as StrapiLocale)
                              }
                            >
                              {l[0]}
                            </Button>
                          )
                        })}
                      </ButtonGroup>
                    </HStack>
                    <AccordionButton
                      w={'40px'}
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      <AccordionIcon />
                    </AccordionButton>
                  </HStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={2} align="flex-start">
                      <Text size="lg" fontWeight={'bold'}>
                        Description
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text size="lg" fontWeight={'bold'}>
                        Content
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <HStack
                    justify={'space-evenly'}
                    borderBottomWidth={1}
                    padding={2}
                    bg={'gray.50'}
                  >
                    <HStack flex={'1'} justify={'space-evenly'}>
                      <HStack spacing={2} flex={'1'}>
                        <LanguageSwitcher
                          defaultLocale={'nl'}
                          onLanguageSwitch={locale => alert(locale)}
                        />
                        <Text size={'lg'} fontWeight="bold">
                          Nederlandse Titel
                          <Badge variant="outline" ml="2" colorScheme="yellow">
                            PENDING APPROVAL
                          </Badge>
                        </Text>
                      </HStack>

                      <HStack spacing={3}>
                        {/* <Button
                          leftIcon={<BsTranslate />}
                          colorScheme="orange"
                          variant="outline"
                        >
                          NL
                        </Button> */}
                        <Button
                          leftIcon={<BsTranslate />}
                          colorScheme="purple"
                          variant="outline"
                        >
                          EN
                        </Button>
                      </HStack>
                    </HStack>
                    <AccordionButton
                      w={'40px'}
                      alignItems="center"
                      justifyContent={'center'}
                    >
                      <AccordionIcon />
                    </AccordionButton>
                  </HStack>
                  <AccordionPanel pb={4}>
                    <VStack spacing={2} align="flex-start">
                      <Text size="lg" fontWeight={'bold'}>
                        Description
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text size="lg" fontWeight={'bold'}>
                        Content
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                      <Text>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et dolore
                        magna aliqua. Ut enim ad minim veniam, quis nostrud
                        exercitation ullamco laboris nisi ut aliquip ex ea
                        commodo consequat. Duis aute irure dolor in
                        reprehenderit in voluptate velit esse cillum dolore eu
                        fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit
                        anim id est laborum.
                      </Text>
                    </VStack>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </Box>
          </ModalBody>
          <ModalFooter borderTopWidth={1}>
            <HStack spacing={3}>
              <Button
                textColor={'white'}
                onClick={onClose}
                bg={'gray.400'}
                leftIcon={<AiOutlineArrowLeft />}
              >
                Return
              </Button>
              {isEditing && (
                <>
                  <Button
                    onClick={onClose}
                    colorScheme={'purple'}
                    leftIcon={<AiOutlineCheck />}
                  >
                    Save Draft
                  </Button>
                  <Button
                    onClick={onClose}
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
