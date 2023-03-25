import { FC, useState } from 'react'

import {
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtApprovalTypes } from './types'
import { WImage } from '../../components'

export const ArtApprovalModal: FC<ArtApprovalTypes> = ({
  art,
  onReject,
  onApprove,
  onDelete,
  artistAvatar,
  isOpen,
  onClose,
  editorAvatar,
  editorName,
  artistName,
  onSave,
  onPublish,
  unPublish,
}) => {
  const router = useRouter()
  const locale = router.locale as StrapiLocale

  const titleKey = `title_${locale}` as const
  const descriptionKey = `description_${locale}` as const

  const [title, setTitle] = useState(art[titleKey])
  const [description, setDescription] = useState(art[descriptionKey])
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDescription, setIsEditingDescription] = useState(false)

  const handleSave = (data: string) => {
    if (data === 'description') {
      setIsEditingDescription(false)
      onSave(art.id, description, 'description')
    } else if (data === 'title') {
      setIsEditingTitle(false)
      onSave(art.id, title, 'title')
    }
  }

  //update field
  const handleUpdate = (data: string) => {
    if (data === 'description') {
      setIsEditingDescription(true)
    } else if (data === 'title') {
      setIsEditingTitle(true)
    }
  }
  return (
    <Box>
      <Modal onClose={onClose} isOpen={isOpen} scrollBehavior="inside">
        <ModalOverlay />
        <ModalContent maxW="95vw" h="full" p={0} overflow="hidden">
          <ModalCloseButton />
          <ModalBody p={0}>
            <SimpleGrid columns={{ base: 1, lg: 2 }} h="full">
              <Stack>
                <WImage src={art.image} alt={title} hasZoom={true} />

                {/* ==============================*/}
              </Stack>
              <Stack spacing={4} p={{ base: 4, lg: 8 }} justify="space-between">
                <Stack>
                  {isEditingTitle ? (
                    // // Textarea and save on edit mode
                    <Stack w="full">
                      <Textarea
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                      />
                      <Button
                        colorScheme="primary"
                        onClick={() => handleSave('title')}
                        alignSelf="end"
                      >
                        Save
                      </Button>
                    </Stack>
                  ) : (
                    <Stack align="start" justify={'start'} w="full">
                      <Text color={'blue.400'} fontWeight={700}>
                        {title}
                      </Text>
                    </Stack>
                  )}
                  <HStack spacing={3} w={'full'}>
                    {/* TODO art owner avatar should be here*/}
                    <Avatar size="sm" src={artistAvatar} name={artistName} />
                    <Text fontWeight={700}>{artistName}</Text>
                  </HStack>
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    {isEditingDescription ? (
                      // // Textarea and save on edit mode
                      <Stack w="full">
                        <Textarea
                          onChange={e => setDescription(e.target.value)}
                          value={description}
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('description')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={700}>
                          Description
                        </Text>
                        <Text>{description}</Text>
                      </Stack>
                    )}
                  </Flex>
                </Stack>
                {/*feedback ================================= */}
                <ArtFeedbackForm
                  art={art}
                  editorAvatar={editorAvatar}
                  editorName={editorName}
                  onApprove={onApprove}
                  onDelete={onDelete}
                  onPublish={onPublish}
                  onReject={onReject}
                  unPublish={unPublish}
                  updateField={handleUpdate}
                />
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
