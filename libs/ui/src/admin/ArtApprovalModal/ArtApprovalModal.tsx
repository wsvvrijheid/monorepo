import { FC, useEffect, useState } from 'react'

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

import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtApprovalTypes } from './types'
import { WImage } from '../../components'

export const ArtApprovalModal: FC<ArtApprovalTypes> = ({
  onReject,
  onApprove,
  onDelete,
  artId,
  artDescription,
  artTitle,
  artistAvatar,
  artImage,
  isOpen,
  onClose,
  editorAvatar,
  editorName,
  artistName,
  onSave,
  onPublish,
  unPublish,
  artApprovalStatus,
  artPublishedAt,
}) => {
  const [description, setDescription] = useState(artDescription)
  const [title, setTitle] = useState(artTitle)
  const [isEditingTitle, setIsEditingTitle] = useState(false)
  const [isEditingDesciption, setIsEditingDesciption] = useState(false)

  const handleSave = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(false)
      onSave(artId, description, 'description')
    } else if (data === 'title') {
      setIsEditingTitle(false)
      onSave(artId, title, 'title')
    }
  }
  //set new description and content
  useEffect(() => {
    setDescription(artDescription)
  }, [artDescription])

  useEffect(() => {
    setTitle(artTitle)
  }, [artTitle])
  //update field
  const handleUpdate = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(true)
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
                <WImage src={artImage} alt={artTitle} hasZoom={true} />

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
                    {isEditingDesciption ? (
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
                  onReject={onReject}
                  onApprove={onApprove}
                  onPublish={onPublish}
                  unPublish={unPublish}
                  artPublishedAt={artPublishedAt}
                  artApprovalStatus={artApprovalStatus}
                  onDelete={onDelete}
                  artId={artId}
                  artDescription={artDescription}
                  editorAvatar={editorAvatar}
                  editorName={editorName}
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
