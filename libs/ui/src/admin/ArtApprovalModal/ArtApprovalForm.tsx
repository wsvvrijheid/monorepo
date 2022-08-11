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
  artImages,
  editorId,
  isOpen,
  // onOpen,
  onClose,
  // editorAvatar,
  // editorName,
  artArtistName,
  isEdit,
}) => {
  const [feedback, setFeedback] = useState('')

  const handleReject = (artId: number, editorId: number) => {
    onReject(artId, editorId, feedback)
  }

  const handleApprove = (artId: number, editorId: number) => {
    onApprove(artId, editorId, feedback)
  }
  const handleDelete = (artId: number) => {
    onDelete(artId)
  }

  return (
    <Box>
      <Modal onClose={onClose} size={['1088px']} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={['column', 'row']} spacing={4} m={4}>
              <Stack w={'full'}>
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
              <VStack spacing={4} align={'start'} justify="space-between">
                <VStack align={'start'} justify="space-between">
                  <Flex align="start" justify="start" w="full" h={8}>
                    <Text color={'blue.400'} fontWeight={'bold'}>
                      {artTitle}
                    </Text>
                  </Flex>
                  <HStack spacing={3} w={'full'}>
                    {/* TODO art owner avatar should be here*/}
                    <Avatar size="sm" src="https://bit.ly/dan-abramov" />
                    <Text fontWeight={'bold'}>{artArtistName}</Text>
                  </HStack>
                  <Flex
                    align="start"
                    justify={'start'}
                    w="full"
                    maxH={'72px'}
                    overflow="auto"
                  >
                    {/* TODO scroll should be here when art has long text*/}
                    <Text>{artDescription}</Text>
                  </Flex>
                </VStack>

                <VStack align={'start'} w={'full'}>
                  <Flex align="start" justify={'start'} w="full">
                    <Text color={'black'} fontWeight={'bold'}>
                      Give Feedback
                    </Text>
                  </Flex>

                  <HStack w="full">
                    {/* avatar*/}
                    <Stack align={'start'} flex={1} textAlign="center">
                      <Avatar
                        size="sm"
                        src="https://bit.ly/dan-abramov"
                        // src={editorAvatar}
                      />
                    </Stack>
                    <VStack w="full">
                      {/* text area, button group*/}
                      <Stack w={'full'}>
                        {/* text area*/}
                        <Textarea
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
                            onClick={() => handleReject(artId, editorId)}
                            bg={'red.500'}
                            colorScheme={'white'}
                            w="full"
                            h={10}
                            pr={2}
                            _hover={{ bg: 'red.400' }}
                            leftIcon={<HiOutlineX />}
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={() => handleApprove(artId, editorId)}
                            bg={'green.500'}
                            colorScheme={'white'}
                            w="full"
                            h={10}
                            pr={2}
                            _hover={{ bg: 'green.400' }}
                            leftIcon={<HiOutlineCheck />}
                          >
                            Approve
                          </Button>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<HiDotsVertical />}
                              bg={'blue.500'}
                              color={'white'}
                              w={10}
                              h={10}
                              _hover={{ bg: 'blue.400' }}
                            ></MenuButton>
                            <MenuList minWidth={32} minH={20}>
                              <Stack
                                spacing={2}
                                justifyContent={'flex-start'}
                                alignItems={'flex-start'}
                              >
                                <MenuItem
                                  as={Button}
                                  onClick={() => isEdit}
                                  variant="ghost"
                                  colorScheme="red"
                                  icon={<HiPencil />}
                                  _hover={{ bg: 'blue.400', color: 'white' }}
                                  ml={4}
                                  w={24}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  as={Button}
                                  onClick={() => handleDelete(artId)}
                                  variant="ghost"
                                  colorScheme="red"
                                  icon={<HiOutlineX />}
                                >
                                  Delete
                                </MenuItem>
                              </Stack>
                            </MenuList>
                          </Menu>
                        </ButtonGroup>
                      </Stack>
                    </VStack>
                  </HStack>
                </VStack>
              </VStack>
            </Stack>
          </ModalBody>
          {/* <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter> */}
        </ModalContent>
      </Modal>
    </Box>
  )
}
