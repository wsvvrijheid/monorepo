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
  IconButton,
} from '@chakra-ui/react'
import {
  HiDotsVertical,
  HiOutlineCheck,
  HiOutlineX,
  HiPencil,
} from 'react-icons/hi'
import { MdOutlinePublish, MdOutlineUnpublished } from 'react-icons/md'

import { ArtFeedbackFormTypes } from './types'

export const ArtFeedbackForm: FC<ArtFeedbackFormTypes> = ({
  onReject,
  onApprove,
  onDelete,
  art,
  editorAvatar,
  editorName,
  updateField,
  onPublish,
  unPublish,
}) => {
  const [feedback, setFeedback] = useState('')

  const handleReject = () => onReject(art.id, feedback)
  const handleApprove = () => onApprove(art.id, feedback)
  const handleDelete = () => onDelete(art.id)
  const handlePublish = () => onPublish(art.id)
  const handleUnPublish = () => unPublish(art.id)

  return (
    <Stack w={'full'} spacing={{ base: 2, lg: 4 }}>
      <Text color={'black'} fontWeight={700}>
        Give Feedback
      </Text>

      {/*feedback ================================= */}
      <HStack align="start" spacing={{ base: 2, lg: 4 }}>
        {/* avatar*/}

        <Avatar size="sm" src={editorAvatar} name={editorName} />

        <Stack flex={1} spacing={{ base: 2, lg: 4 }}>
          {/* text area, button group*/}
          <Stack>
            {/* text area*/}
            <Textarea
              isRequired
              onChange={e => setFeedback(e.target.value)}
              placeholder={'Type your comment here'}
            />
          </Stack>
          {/*button group*/}
          <Stack direction={'row'} spacing={{ base: 2, lg: 4 }}>
            <Button
              isDisabled={!feedback || art.approvalStatus === 'rejected'}
              onClick={handleReject}
              colorScheme="red"
              w="full"
              leftIcon={<HiOutlineX />}
            >
              Reject
            </Button>

            <Button
              isDisabled={!feedback || art.approvalStatus === 'approved'}
              onClick={handleApprove}
              colorScheme="purple"
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
              />
              <MenuList minWidth={32} minH={20}>
                <MenuItem
                  as={Button}
                  onClick={() => updateField('title')}
                  variant="ghost"
                  colorScheme="primary"
                  icon={<HiPencil />}
                >
                  Edit Title
                </MenuItem>
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
                {art.approvalStatus === 'approved' && (
                  <MenuItem
                    as={Button}
                    onClick={art.publishedAt ? handleUnPublish : handlePublish}
                    variant="ghost"
                    colorScheme="primary"
                    icon={
                      art.publishedAt ? (
                        <MdOutlineUnpublished />
                      ) : (
                        <MdOutlinePublish />
                      )
                    }
                  >
                    {art.publishedAt ? 'Unpublish' : 'Publish'}
                  </MenuItem>
                )}

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
