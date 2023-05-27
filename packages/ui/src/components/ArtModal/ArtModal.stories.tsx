import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { sample } from 'lodash'

import { ART_MOCKS } from '@wsvvrijheid/mocks'

import { ArtModal } from './ArtModal'
import { ArtModalProps } from './types'

const sampleArt = sample(ART_MOCKS.data)!

export default {
  component: ArtModal,
  title: 'Shared/ArtModal',
} as Meta<ArtModalProps>

const Template: Story<ArtModalProps> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={() => onOpen()} m={4}>
        {`Open Modal`}
      </Button>
      <ArtModal {...args} art={sampleArt} isOpen={isOpen} onClose={onClose} />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
