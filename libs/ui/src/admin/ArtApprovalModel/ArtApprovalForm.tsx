import { FC, memo } from 'react'

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
  useDisclosure,
  VStack,
  Image,
  Center,
  Flex,
} from '@chakra-ui/react'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import { BiEditAlt } from 'react-icons/bi'
import { HiDotsVertical, HiOutlineCheck, HiOutlineX } from 'react-icons/hi'

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
  onEdit,
  art,
  user,
}) => {
  // onReject and onApprove should receive art id, feedback, editor id
  const { isOpen, onOpen, onClose } = useDisclosure()
  const handleSizeClick = newSize => {
    onOpen()
  }

  const handleReject = data => {
    onReject(data)
  }
  const handleEdit = data => {
    onEdit(data)
  }
  const handleApprove = data => {
    onApprove(data)
  }
  const handleDelete = data => {
    onDelete(data)
  }
  const handleInputChange = data => {
    console.log(data)
  }
  return (
    <>
      <Button
        onClick={() => handleSizeClick('full')}
        m={4}
      >{`Open ArtApproval Modal`}</Button>
      <Modal
        onClose={onClose}
        // size={['xs', 'sm', 'md', 'lg', 'xl', 'full']}
        size={['1088px']}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            <Stack direction={['column', 'row']} spacing={4}>
              <Stack w={'full'}>
                {art.images && art.images.length > 1 ? (
                  <Splide>
                    {art?.images.map(image => (
                      <Center as={SplideSlide} key={image.id}>
                        <ArtImage image={image} alt={art.title} />
                      </Center>
                    ))}
                  </Splide>
                ) : (
                  <ArtImage image={art.images?.[0]} alt={art.title} />
                )}
              </Stack>
              <VStack spacing={4} align={'start'} justify="space-between">
                <VStack align={'start'} justify="space-between">
                  <Flex align="start" justify="start" w="full" h={8}>
                    <Text color={'blue.400'} fontWeight={'bold'}>
                      {art?.title}
                    </Text>
                  </Flex>
                  <HStack spacing={3} w={'full'}>
                    {/* TODO art owner avatar should be here*/}
                    <Avatar
                      w={8}
                      h={8}
                      src="https://bit.ly/dan-abramov"
                    ></Avatar>
                    <Text fontWeight={'bold'}>{art?.artist?.name}</Text>
                  </HStack>
                  <Flex align="start" justify={'start'} w="full" h={'72px'}>
                    {/* TODO scroll should be here when art has long text*/}
                    <Text>{art?.content}</Text>
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
                    <Stack
                      align={'start'}
                      h={'136px'}
                      flex={1}
                      textAlign="center"
                    >
                      <Avatar
                        w={8}
                        h={8}
                        src="https://bit.ly/dan-abramov"
                        // src={user?.avatar}
                      ></Avatar>
                    </Stack>
                    <VStack w="full">
                      {/* text area, button group*/}
                      <Stack w={'full'}>
                        {/* text area*/}
                        <Textarea
                          size={['sm', 'md', 'lg', 'xl']}
                          onChange={handleInputChange}
                          placeholder={'type your comment here'}
                        ></Textarea>
                      </Stack>
                      <Stack w={'full'}>
                        {/*button group*/}
                        <ButtonGroup
                          alignItems="space-between"
                          w={'full'}
                          justifyItems="flex-end"
                          spacing={[2, 4, 6, 8]}
                        >
                          <Button
                            onClick={() => handleReject('reject')}
                            bg={'red.500'}
                            colorScheme={'white'}
                            w={[32, 44]}
                            h={10}
                            pr={2}
                            _hover={{ bg: 'red.400' }}
                            leftIcon={<HiOutlineX w={3.5} h={3.5} />}
                          >
                            Reject
                          </Button>
                          <Button
                            onClick={event => handleApprove(event)}
                            bg={'green.500'}
                            colorScheme={'white'}
                            w={[32, 44]}
                            h={10}
                            pr={2}
                            _hover={{ bg: 'green.400' }}
                            leftIcon={<HiOutlineCheck w={3.5} h={3.5} />}
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
                                  onClick={() => handleEdit('Edit')}
                                  bg={'white'}
                                  _hover={{ bg: 'blue.400', color: 'white' }}
                                  ml={4}
                                  w={24}
                                  icon={<BiEditAlt w={3.5} h={3.5} />}
                                >
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  as={Button}
                                  onClick={() => handleDelete('Delete')}
                                  bg={'white'}
                                  color={'red'}
                                  _hover={{ bg: 'red.400', color: 'white' }}
                                  ml={4}
                                  w={24}
                                  icon={<HiOutlineX w={3.5} h={3.5} />}
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
    </>
  )
}
