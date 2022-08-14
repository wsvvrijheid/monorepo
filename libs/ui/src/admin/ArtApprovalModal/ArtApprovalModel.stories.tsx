import { useState } from 'react'

import { Container, useDisclosure, Button, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '../../mocks/strapi'
import { ArtApprovalModal } from './ArtApprovalModal'
import '@splidejs/splide/dist/css/themes/splide-default.min.css'

export default {
  component: ArtApprovalModal,
  title: 'Admin/ArtApprovalModal',
  args: {
    artId: ART_MOCKS.data[0].id,
    artDescription: ART_MOCKS.data[0].description,
    artTitle: ART_MOCKS.data[0].title,
    artImages: ART_MOCKS.data[0].images,
    editorId: USER_MOCKS[0].id,
    editorAvatar: USER_MOCKS[0].avatar,
    editorName: USER_MOCKS[0].username,
    artistName: ART_MOCKS.data[0].artist?.name,
    artistAvatar: 'https://bit.ly/sage-adebayo',
  },
  decorators: [
    Story => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as ComponentMeta<typeof ArtApprovalModal>

const Template: ComponentStory<typeof ArtApprovalModal> = args => {
  const {
    artId,
    artDescription,
    artTitle,
    artImages,
    editorId,
    editorAvatar,
    editorName,
    artistName,
    artistAvatar,
  } = args
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isEditing, setIsEditing] = useState(false)
  const handleReject = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    onClose()
  }
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
  const onSave = (data: string) => {
    alert(`${data} saved`)
    setIsEditing(false)
  }

  return (
    <Box>
      <Button onClick={() => handleSizeClick()} m={4}>
        {`Open Modal`}
      </Button>
      <ArtApprovalModal
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
        artistName={artistName}
        artistAvatar={artistAvatar}
        onSave={onSave}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
export const LongDescription = Template.bind({})
LongDescription.args = {
  artDescription: `Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
  Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
  parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
  Placerat arcu dui potenti; nullam taciti taciti amet.`,
}
export const VerticalArts = Template.bind({})
VerticalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
  ] as unknown as string[],
}
export const HorizontalArts = Template.bind({})
HorizontalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
  ] as unknown as string[],
}
export const MultiableArts = Template.bind({})
MultiableArts.args = {
  artImages: ART_MOCKS.data[4].images,
}
