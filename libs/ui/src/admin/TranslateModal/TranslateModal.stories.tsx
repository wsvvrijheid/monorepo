import { Container, useDisclosure, Button, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TranslateModal } from './TranslateModal'

export default {
  component: TranslateModal,
  title: 'Admin/TranslateModal',
  args: {},
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof TranslateModal>

const Template: ComponentStory<typeof TranslateModal> = args => {
  const {} = args
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
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
