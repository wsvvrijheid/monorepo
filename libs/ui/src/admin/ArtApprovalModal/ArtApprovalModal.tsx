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
  artContent,
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
  const [content, setContent] = useState(artContent)
  const [isEditingDesciption, setIsEditingDesciption] = useState(false)
  const [isEditingContent, setIsEditingContent] = useState(false)

  const handleSave = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(false)
      onSave(artId, description, 'description')
    } else if (data === 'content') {
      setIsEditingContent(false)
      onSave(artId, content, 'content')
    }
  }
  //set new description and content
  useEffect(() => {
    setDescription(artDescription)
  }, [artDescription])
  useEffect(() => {
    setContent(artContent)
  }, [artContent])

  //update field
  const handleUpdate = (data: string) => {
    if (data === 'description') {
      setIsEditingDesciption(true)
    } else if (data === 'content') {
      setIsEditingContent(true)
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
                  <Text color={'blue.400'} fontWeight={'bold'}>
                    {artTitle}
                  </Text>
                  <HStack spacing={3} w={'full'}>
                    {/* TODO art owner avatar should be here*/}
                    <Avatar size="sm" src={artistAvatar} name={artistName} />
                    <Text fontWeight={'bold'}>{artistName}</Text>
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
                        <Text color={'black'} fontWeight={'bold'}>
                          Description
                        </Text>
                        <Text>{description}</Text>
                      </Stack>
                    )}
                  </Flex>
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    {isEditingContent ? (
                      // // Textarea and save on edit mode
                      <Stack w="full">
                        <Textarea
                          onChange={e => setContent(e.target.value)}
                          value={content}
                        />
                        <Button
                          colorScheme="primary"
                          onClick={() => handleSave('content')}
                          alignSelf="end"
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Stack align="start" justify={'start'} w="full">
                        <Text color={'black'} fontWeight={'bold'}>
                          Content
                        </Text>
                        <Text>{content}</Text>
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
