import { Box, Button, useDisclosure } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { sample } from 'lodash'

import { ArtModal, ArtModalProps } from './ArtModal'

const sampleArt = sample(ART_MOCKS.tr.data)

export default {
  component: ArtModal,
  title: 'Shared/ArtModal',
  parameters: {
    nextRouter: {
      locale: sampleArt.locale,
    },
  },
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

export const Auth = Template.bind({})
Auth.args = {
  auth: {
    isLoggedIn: true,
    user: sample(USER_MOCKS),
    token: 'mock-token',
  },
}
