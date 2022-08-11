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
  } = args
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log('args: ', args)
  console.log('Art: ', ART_MOCKS.data[0])
  const handleReject = (data: any) => {
    alert(data)
  }
  const isEdit = false
  const handleApprove = (data: any) => {
    alert(data)
  }
  const handleDelete = (data: any) => {
    alert(data)
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
        onOpen={onOpen}
        onApprove={handleApprove}
        onDelete={handleDelete}
        onClose={onClose}
        onReject={handleReject}
        artArtistName={artArtistName}
        isEdit={isEdit}
      />
    </Box>
  )
}

/*
 artId={args.art?.id}
      artTitle={args.art.title}
      artDescription={args.art.description}
      editorId={args.user.id}
      editorAvatar={args.user.avatar}
      editorName={args.user.name}
      isOpen={}
      onOpen={}
      onApprove={artId, editorId, feedback}
      onDelete={artId}
      onReject={artId, editorId, feedback}

*/
// onReject: (artId: number, editorId: number, feedback: string) => void
// onApprove: (artId: number, editorId: number, feedback: string) => void
// onDelete: (artId: number) => void
// artId: number
// artTitle: string
// artDescription: string
// editorId: number
// editorName: string
// editorAvatar: string
// isOpen: boolean
// onOpen: () => void

export const Default = Template.bind({})
Default.args = {}
