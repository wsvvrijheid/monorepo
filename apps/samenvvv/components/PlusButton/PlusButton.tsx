import React from 'react'

import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Tooltip,
  useBoolean,
  useDisclosure,
} from '@chakra-ui/react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { MdFeedback } from 'react-icons/md'

import { UserFeedbackForm } from '@wsvvrijheid/ui'

export const PlusButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useBoolean()

  return (
    <Box>
      <Popover
        closeOnBlur={false}
        placement="top"
        onOpen={setIsEditing.on}
        onClose={setIsEditing.off}
      >
        <PopoverTrigger>
          <Button
            position={'fixed'}
            zIndex={'modal'}
            right={0}
            bottom={50}
            borderRadius={'100px'}
            colorScheme="primary"
            aria-label="Plus"
            rightIcon={isEditing ? <AiOutlineClose /> : <AiOutlinePlus />}
          />
        </PopoverTrigger>
        <Portal>
          <PopoverContent p={0} w={'auto'}>
            <PopoverBody>
              <Tooltip label="Feedback" placement="top">
                <IconButton
                  aria-label={'feedback'}
                  colorScheme={'primary'}
                  icon={<MdFeedback />}
                  isDisabled={isOpen}
                  isRound
                  onClick={onOpen}
                  size={'sm'}
                />
              </Tooltip>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <UserFeedbackForm isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}
