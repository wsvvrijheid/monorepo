import { Container, useDisclosure, Button, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ART_MOCKS } from '@wsvvrijheid/mocks'
import { MergedStrapiModel } from '@wsvvrijheid/types'
import { sample } from 'lodash'

import { TranslateModal } from './TranslateModal'

export default {
  component: TranslateModal,
  title: 'Admin/TranslateModal',
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof TranslateModal>

const Template: ComponentStory<typeof TranslateModal> = args => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleApprove = (Id: number, content: string) => {
    console.log('Approve data here')
    onClose()
  }

  const handleSizeClick = () => {
    onOpen()
  }
  const onSave = (data: string) => {
    alert(`${data} saved`)
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open Modal`}
      </Button>
      <TranslateModal
        {...args}
        isOpen={isOpen}
        onApprove={handleApprove}
        onClose={onClose}
        onSave={onSave}
        model={sample(ART_MOCKS.data) as MergedStrapiModel}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
