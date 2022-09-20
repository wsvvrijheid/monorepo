import { FC, useEffect, useState } from 'react'

import '@splidejs/splide/dist/css/themes/splide-default.min.css'
import {
  Avatar,
  HStack,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Box,
  Flex,
  SimpleGrid,
  Button,
  Textarea,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'

import { WImage } from '../../components'
import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtApprovalTypes } from './types'

export const ArtApprovalModal: FC<ArtApprovalTypes> = ({
  onReject,
  onApprove,
  onDelete,
  artId,
  artDescription,
  artContent,
  artTitle,
  artistAvatar,
  artImages,
  editorId,
  isOpen,
  onClose,
  editorAvatar,
  editorName,
  artistName,
  onSave,
  onPublish,
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
  useEffect(() => {
    setDescription(artDescription)
  }, [artDescription])
  //update field
  const handleUpdate = (data: string) => {
    console.log('handleUpdate', data)
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
        <ModalContent maxW="95vw" h="full" p={{ base: 2, lg: 4 }}>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4} h="full">
              <Stack>
                {/*TODO Image should has zoom  */}
                {artImages && artImages.length > 1 ? (
                  <Box
                    as={Splide}
                    sx={{ h: 'full', '.splide__track': { h: 'full' } }}
                  >
                    {artImages?.map((image, index) => (
                      <SplideSlide key={index} style={{ height: '100%' }}>
                        <WImage
                          objectFit="contain"
                          src={image}
                          alt={artTitle}
                          hasZoom={true}
                        />
                      </SplideSlide>
                    ))}
                  </Box>
                ) : (
                  <WImage
                    objectFit="contain"
                    src={artImages?.[0]}
                    alt={artTitle}
                    hasZoom={true}
                  />
                )}
                {/* ==============================*/}
              </Stack>
              <Stack spacing={4} justify="space-between">
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
                          colorScheme="green"
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
                          colorScheme="green"
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
                  onDelete={onDelete}
                  artId={artId}
                  editorId={editorId}
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
