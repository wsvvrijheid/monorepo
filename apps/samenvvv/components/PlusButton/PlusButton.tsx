import React from 'react'

import {
  Box,
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
import { AiOutlineClose } from 'react-icons/ai'
import { FaPlus } from 'react-icons/fa'
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
          <IconButton
            position={'fixed'}
            zIndex={'modal'}
            // value={4,8,4,8}
            isRound
            right={0}
            bottom={50}
            borderRadius={'100px'}
            colorScheme="primary"
            aria-label="Plus"
            size={'lg'}
            icon={isEditing ? <AiOutlineClose /> : <FaPlus />}
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
