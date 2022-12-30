import { Container, useDisclosure, Button, Box } from '@chakra-ui/react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'

import { ArtApprovalModal } from './ArtApprovalModal'

const artMock = ART_MOCKS.tr.data[0]

export default {
  component: ArtApprovalModal,
  title: 'Admin/ArtApprovalModal',
  args: {
    artDescription: artMock.description,
    artId: artMock.id,
    artImage: artMock.image,
    artTitle: artMock.title,
    artistAvatar: 'https://bit.ly/sage-adebayo',
    artistName: artMock.artist?.name,
    editorAvatar: USER_MOCKS[0].avatar,
    editorId: USER_MOCKS[0].id,
    editorName: USER_MOCKS[0].username,
  },
  decorators: [
    (Story: any) => (
      <Container maxW="container.sm">
        <Story />
      </Container>
    ),
  ],
} as unknown as ComponentMeta<typeof ArtApprovalModal>

const Template: ComponentStory<typeof ArtApprovalModal> = args => {
  const {
    artId,
    artDescription,
    artTitle,
    artImage,
    editorId,
    editorAvatar,
    editorName,
    artistName,
    artistAvatar,
  } = args
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleReject = (artId: number, editorId: number, feedback: string) => {
    alert(feedback)
    console.log('Reject data here', artId, editorId, feedback)
    onClose()
  }
  const handleApprove = (artId: number, editorId: number, feedback: string) => {
    console.log('Approve data here', artId, editorId, feedback)
    alert(feedback)
    onClose()
  }
  const handleDelete = (id: number) => {
    alert(`${id} is deleted`)
    onClose()
  }
  const handleSizeClick = () => {
    onOpen()
  }
  const onSave = (data: number) => {
    alert(`${data} saved`)
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
        artImage={artImage}
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
  artImage:
    'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
}
export const MultiVerticalArts = Template.bind({})
MultiVerticalArts.args = {
  artImage:
    'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
}
export const HorizontalArts = Template.bind({})
HorizontalArts.args = {
  artImage:
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
}
export const MultiHorizontalArts = Template.bind({})
MultiHorizontalArts.args = {
  artImage:
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
}
export const MultiHorizontalVerticalArts = Template.bind({})
MultiHorizontalVerticalArts.args = {
  artImage:
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
}

export const MultiableArts = Template.bind({})
MultiableArts.args = {
  artImage: ART_MOCKS.tr.data[4].image,
}
