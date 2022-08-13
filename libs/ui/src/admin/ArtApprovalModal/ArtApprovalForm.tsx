import { FC, memo, useState } from 'react'

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
  Image,
  Center,
  Flex,
  SimpleGrid,
  Button,
  Textarea,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'

import { ArtFeedbackForm } from './ArtFeedbackForm'
import { ArtImageProps, ArtApprovalFormTypes } from './types'

const ArtImage: FC<ArtImageProps> = memo(({ image, alt }) => {
  return (
    <Image
      objectFit="contain"
      src={`${process.env['NX_API_URL']}${image.url}`}
      alt={alt}
    />
  )
})

export const ArtApprovalForm: FC<ArtApprovalFormTypes> = ({
  onReject,
  onApprove,
  onDelete,
  artId,
  artDescription,
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
  setIsEditing,
  isEditing,
}) => {
  const [description, setDescription] = useState(artDescription)
  return (
    <Box>
      <Modal onClose={onClose} size="6xl" isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={4}>
              <Stack>
                {/*TODO Image should has zoom  */}
                {artImages && artImages.length > 1 ? (
                  <Splide>
                    {artImages?.map(image => (
                      <Center as={SplideSlide} key={image?.id}>
                        <ArtImage image={image} alt={artTitle} />
                      </Center>
                    ))}
                  </Splide>
                ) : (
                  <ArtImage image={artImages?.[0]} alt={artTitle} />
                )}
              </Stack>
              <Stack spacing={4} align={'start'} justify="space-between">
                <Stack align={'start'} justify="space-between">
                  <Flex align="start" justify="start" w="full" h={8}>
                    <Text color={'blue.400'} fontWeight={'bold'}>
                      {artTitle}
                    </Text>
                  </Flex>
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
                    {isEditing ? (
                      // // Textarea and save on edit mode
                      <Stack w="full">
                        <Textarea
                          onChange={e => setDescription(e.target.value)}
                          value={description}
                        />
                        <Button
                          colorScheme="green"
                          onClick={() => onSave(description)}
                        >
                          Save
                        </Button>
                      </Stack>
                    ) : (
                      <Text>{description}</Text>
                    )}
                  </Flex>
                </Stack>
                {/*feedback ================================= */}
                <ArtFeedbackForm
                  onReject={onReject}
                  onApprove={onApprove}
                  onDelete={onDelete}
                  artId={artId}
                  editorId={editorId}
                  artDescription={artDescription}
                  editorAvatar={editorAvatar}
                  editorName={editorName}
                  setIsEditing={setIsEditing}
                />
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
