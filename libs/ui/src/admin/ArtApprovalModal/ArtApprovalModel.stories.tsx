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
  const onSave = (data: string) => {
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
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {
  hasZoom: true,
}
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
    'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
  ],
}
export const MultiVerticalArts = Template.bind({})
MultiVerticalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
    'https://st2.depositphotos.com/2288675/5430/i/450/depositphotos_54306899-stock-photo-balance-and-harmony-in-nature.jpg',
    'https://image.shutterstock.com/image-photo/color-toned-scenic-highway-travel-260nw-596744513.jpg',
    'https://st2.depositphotos.com/2288675/5430/i/450/depositphotos_54306899-stock-photo-balance-and-harmony-in-nature.jpg',
  ],
}
export const HorizontalArts = Template.bind({})
HorizontalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
  ],
}
export const MultiHorizontalArts = Template.bind({})
MultiHorizontalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
    'https://image.shutterstock.com/image-photo/red-horizontal-lens-flares-pack-260nw-1901871499.jpg',
    'https://images.all-free-download.com/images/graphiclarge/beach_cloud_dawn_horizon_horizontal_landscape_ocean_601821.jpg',
    'https://ironcodestudio.com/wp-content/uploads/2015/03/css-remove-horizontal-scrollbar.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78tAx34o7JbBCMmt-636ZxZbw4fv8Wr9bIQ&usqp=CAU',
  ],
}
export const MultiHorizontalVerticalArts = Template.bind({})
MultiHorizontalVerticalArts.args = {
  artImages: [
    'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
    'https://st2.depositphotos.com/2288675/5430/i/450/depositphotos_54306899-stock-photo-balance-and-harmony-in-nature.jpg',
    'https://images.all-free-download.com/images/graphiclarge/beach_cloud_dawn_horizon_horizontal_landscape_ocean_601821.jpg',
    'https://image.shutterstock.com/image-photo/color-toned-scenic-highway-travel-260nw-596744513.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ78tAx34o7JbBCMmt-636ZxZbw4fv8Wr9bIQ&usqp=CAU',
  ],
}

export const MultiableArts = Template.bind({})
MultiableArts.args = {
  artImages: ART_MOCKS.data[4].images,
}
