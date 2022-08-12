import { FC, memo, useState } from 'react'

import {
  Avatar,
  Button,
  ButtonGroup,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Textarea,
  Box,
  VStack,
  Image,
  Center,
  Flex,
  SimpleGrid,
  IconButton,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import {
  HiDotsVertical,
  HiOutlineCheck,
  HiOutlineX,
  HiPencil,
} from 'react-icons/hi'

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
  artAvatar,
  artImages,
  editorId,
  isOpen,
  onClose,
  editorAvatar,
  editorName,
  artArtistName,
  isEdit,
}) => {
  const [feedback, setFeedback] = useState('')

  const handleReject = () => {
    onReject(artId, editorId, feedback)
  }

  const handleApprove = () => {
    onApprove(artId, editorId, feedback)
  }
  const handleDelete = () => {
    onDelete(artId)
  }
  return (
    <Box>
      <Modal onClose={onClose} size={['1088px']} isOpen={isOpen}>
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
                    <Avatar size="sm" src={artAvatar} name={artArtistName} />
                    <Text fontWeight={'bold'}>{artArtistName}</Text>
                  </HStack>
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'150px'}
                    overflow="auto"
                  >
                    <Text>{artDescription}</Text>
                  </Flex>
                </Stack>

                <VStack align={'start'} w={'full'}>
                  <Flex align="start" justify={'start'} w="full">
                    <Text color={'black'} fontWeight={'bold'}>
                      Give Feedback
                    </Text>
                  </Flex>

                  <HStack w="full">
                    {/* avatar*/}
                    <Stack align={'start'} flex={1} textAlign="center">
                      <Avatar size="sm" src={editorAvatar} name={editorName} />
                    </Stack>
                    <VStack w="full">
                      {/* text area, button group*/}
                      <Stack w={'full'}>
                        {/* text area*/}
                        <Textarea
                          isRequired
                          size={['sm', 'md', 'lg', 'xl']}
                          onChange={e => setFeedback(e.target.value)}
                          placeholder={'type your comment here'}
                        ></Textarea>
                      </Stack>
                      <Stack w={'full'}>
                        {/*button group*/}
                        <ButtonGroup
                          alignItems="space-between"
                          w={'full'}
                          justifyItems="flex-end"
                          spacing={4}
                        >
                          <Button
                            onClick={handleReject}
                            colorScheme="red"
                            w="full"
                            leftIcon={<HiOutlineX />}
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={handleApprove}
                            colorScheme="green"
                            w="full"
                            leftIcon={<HiOutlineCheck />}
                          >
                            Approve
                          </Button>
                          <Menu>
                            <MenuButton
                              aria-label="Open art menu"
                              as={IconButton}
                              icon={<HiDotsVertical />}
                              colorScheme="primary"
                            ></MenuButton>
                            <MenuList minWidth={32} minH={20}>
                              <MenuItem
                                as={Button}
                                onClick={() => isEdit}
                                variant="ghost"
                                colorScheme="red"
                                icon={<HiPencil />}
                                _hover={{ bg: 'blue.400', color: 'white' }}
                              >
                                Edit{' '}
                              </MenuItem>

                              <MenuItem
                                as={Button}
                                onClick={handleDelete}
                                variant="ghost"
                                colorScheme="red"
                                icon={<HiOutlineX />}
                                _hover={{ bg: 'red', color: 'white' }}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </ButtonGroup>
                      </Stack>
                    </VStack>
                  </HStack>
                </VStack>
              </Stack>
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
