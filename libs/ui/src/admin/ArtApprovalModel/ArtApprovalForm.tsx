import { FC } from 'react'

import {
  Avatar,
  Button,
  ButtonGroup,
  HStack,
  Text,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Textarea,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import { HiDotsVertical } from 'react-icons/hi'

export type ArtApprvalFormTypes = {
  onReject: any
  onApprove: any
  onDelete: any
  onEdit: any
}
export const ArtApprovalForm: FC<ArtApprvalFormTypes> = ({
  onReject,
  onApprove,
  onDelete,
  onEdit,
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
  return (
    <>
      <Button
        onClick={() => handleSizeClick('lg')}
        m={4}
      >{`Open AryApproval Modal`}</Button>
      <Modal
        onClose={onClose}
        size={['xs', 'sm', 'md', 'lg', 'xl', 'full']}
        isOpen={isOpen}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Art Approval Form</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <HStack>
                <Image></Image>
                <VStack>
                  <VStack>
                    <Text>First Content</Text>
                    <HStack>
                      <Avatar></Avatar>
                      <Text>username</Text>
                    </HStack>
                    <Text>Art Content</Text>
                  </VStack>

                  <VStack>
                    <Text>Give Feedback</Text>
                    <HStack>
                      <Avatar></Avatar>
                      <VStack>
                        <Textarea></Textarea>
                        <ButtonGroup>
                          {
                            //It shoult be Horizantal
                          }
                          <Button onClick={() => handleReject('reject')}>
                            Reject
                          </Button>
                          <Button onClick={() => handleApprove('approve')}>
                            Approve
                          </Button>
                          <Menu>
                            <MenuButton
                              as={Button}
                              rightIcon={<HiDotsVertical />}
                            >
                              Actions
                            </MenuButton>
                            <MenuList>
                              <MenuItem
                                as={Button}
                                onClick={() => handleEdit('Edit')}
                              >
                                Edit
                              </MenuItem>
                              <MenuItem
                                as={Button}
                                onClick={() => handleDelete('Delete')}
                              >
                                Delete
                              </MenuItem>
                            </MenuList>
                          </Menu>
                        </ButtonGroup>
                      </VStack>
                    </HStack>
                  </VStack>
                </VStack>
              </HStack>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
