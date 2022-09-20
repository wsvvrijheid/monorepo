import { FC, useState } from 'react'

import {
  Avatar,
  Button,
  HStack,
  Text,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Textarea,
  Flex,
  IconButton,
} from '@chakra-ui/react'
import {
  HiDotsVertical,
  HiOutlineCheck,
  HiOutlineX,
  HiPencil,
} from 'react-icons/hi'
import { MdOutlinePublish } from 'react-icons/md'

import { ArtFeedbackFormTypes } from './types'

export const ArtFeedbackForm: FC<ArtFeedbackFormTypes> = ({
  onReject,
  onApprove,
  onDelete,
  artId,
  editorId,
  editorAvatar,
  editorName,
  updateField,
  onPublish,
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
  const handlePublish = () => {
    onPublish(artId)
  }
  return (
    <Stack align={'start'} w={'full'}>
      <Flex align="start" justify={'start'} w="full">
        <Text color={'black'} fontWeight={'bold'}>
          Give Feedback
        </Text>
      </Flex>
      {/*feedback ================================= */}
      <HStack w="full">
        {/* avatar*/}
        <Stack align={'start'} flex={1} textAlign="center">
          <Avatar size="sm" src={editorAvatar} name={editorName} />
        </Stack>
        <Stack w="full">
          {/* text area, button group*/}
          <Stack w={'full'}>
            {/* text area*/}
            <Textarea
              isRequired
              onChange={e => setFeedback(e.target.value)}
              placeholder={'type your comment here'}
            ></Textarea>
          </Stack>
          {/*button group*/}
          <Stack direction={'row'} w={'full'} spacing={[0.5, 4, 4, 4]}>
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
                  onClick={() => updateField('description')}
                  variant="ghost"
                  colorScheme="primary"
                  icon={<HiPencil />}
                >
                  Edit Description
                </MenuItem>
                <MenuItem
                  as={Button}
                  onClick={() => updateField('content')}
                  variant="ghost"
                  colorScheme="primary"
                  icon={<HiPencil />}
                >
                  Edit Content
                </MenuItem>
                <MenuItem
                  as={Button}
                  onClick={handlePublish}
                  variant="ghost"
                  colorScheme="primary"
                  icon={<MdOutlinePublish />}
                >
                  Publish
                </MenuItem>
                <MenuItem
                  as={Button}
                  onClick={handleDelete}
                  variant="ghost"
                  colorScheme="red"
                  icon={<HiOutlineX />}
                >
                  Delete
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        </Stack>
      </HStack>
    </Stack>
  )
}
