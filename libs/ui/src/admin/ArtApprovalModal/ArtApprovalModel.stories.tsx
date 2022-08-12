import { Container, useDisclosure, Button, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '../../mocks/strapi'
import { ArtApprovalForm } from './ArtApprovalForm'
export default {
  component: ArtApprovalForm,
  title: 'Admin/Forms/ArtApprovalForm',
  args: {
    artId: ART_MOCKS.data[0].id,
    artDescription: ART_MOCKS.data[0].description,
    artTitle: ART_MOCKS.data[0].title,
    artImages: ART_MOCKS.data[0].images,
    artFeedbacks: ART_MOCKS.data[0].feedbacks,
    editorId: USER_MOCKS[0].id,
    editorAvatar: USER_MOCKS[0].avatar,
    editorName: USER_MOCKS[0].username,
    artArtistName: ART_MOCKS.data[0].artist?.name,
    artAvatar: 'https://bit.ly/sage-adebayo',
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof ArtApprovalForm>

const Template: ComponentStory<typeof ArtApprovalForm> = args => {
  const {
    artId,
    artDescription,
    artTitle,
    artImages,
    editorId,
    editorAvatar,
    editorName,
    artArtistName,
    artAvatar
  } = args
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleReject = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    onClose()
  }
  const isEdit = false
  const handleApprove = (artId: number, editorId: number, feedback: string) => {
    console.log('Approve data here', artId, editorId, feedback)
    alert(feedback)
    onClose()
  }
  const handleDelete = (data: any) => {
    alert(`${data} is deleted`)
    onClose()
  }
  const handleSizeClick = () => {
    onOpen()
  }

  return (
    <Box>
      <Button
        onClick={() => handleSizeClick('full')}
        m={4}
      >{`Open Modal`}</Button>
      <ArtApprovalForm
        {...args}
        artId={artId}
        artTitle={artTitle}
        artDescription={artDescription}
        artImages={artImages}
        editorId={editorId}
        editorAvatar={editorAvatar}
        editorName={editorName}
        isOpen={isOpen}
        onApprove={handleApprove}
        onDelete={handleDelete}
        onClose={onClose}
        onReject={handleReject}
        artArtistName={artArtistName}
        isEdit={isEdit}
        artAvatar={artAvatar}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
export const longDescription = Template.bind({})
longDescription.args = {
  artDescription: `Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
  Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
  parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
  Placerat arcu dui potenti; nullam taciti taciti amet.`,
}
