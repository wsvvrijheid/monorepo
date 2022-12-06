import { FC } from 'react'

import { Button, HStack } from '@chakra-ui/react'
import { IoMdCheckmark, IoMdClose } from 'react-icons/io'

import { EditButtonsProps } from './types'

export const EditButtons: FC<EditButtonsProps> = ({
  handleSave,
  cancelEdit,
  task,
}) => {
  return (
    <HStack>
      <Button
        leftIcon={<IoMdCheckmark />}
        colorScheme="primary"
        onClick={() => handleSave(task)}
        alignSelf="end"
      >
        Save
      </Button>
      <Button
        onClick={() => cancelEdit(task)}
        alignSelf="end"
        leftIcon={<IoMdClose />}
      >
        Cancel
      </Button>
    </HStack>
  )
}
