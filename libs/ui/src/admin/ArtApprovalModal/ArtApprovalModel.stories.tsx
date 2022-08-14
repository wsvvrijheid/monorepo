import { useState } from 'react'

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
      <Button onClick={() => handleSizeClick('full')} m={4}>
        {`Open Modal`}
      </Button>
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
  // artImages: ART_MOCKS?.data[0]?.images.map((image) =>{
  //   ...ART_MOCKS?.data[0]?.images,image.url:'https://i.picsum.photos/id/308/540/960.jpg?hmac=F8tIzE-s5FZnE_45--3auP0AUHWbIfE9OaLfcon_7vM')}
  //   {
  //     id: 65,
  //     name: 'lotus.jpg',
  //     alternativeText: null,
  //     caption: null,
  //     width: 640,
  //     height: 640,
  //     formats: {
  //       small: {
  //         ext: '.jpg',
  //         url: '/https://i.picsum.photos/id/308/540/960.jpg?hmac=F8tIzE-s5FZnE_45--3auP0AUHWbIfE9OaLfcon_7vM',
  //         hash: 'small_lotus_a1a2e67523',
  //         mime: 'image/jpeg',
  //         name: 'small_lotus.jpg',
  //         path: null,
  //         size: 27.52,
  //         width: 500,
  //         height: 500,
  //       },
  //       thumbnail: {
  //         ext: '.jpg',
  //         url: '/https://i.picsum.photos/id/308/540/960.jpg?hmac=F8tIzE-s5FZnE_45--3auP0AUHWbIfE9OaLfcon_7vM',
  //         hash: 'thumbnail_lotus_a1a2e67523',
  //         mime: 'image/jpeg',
  //         name: 'thumbnail_lotus.jpg',
  //         path: null,
  //         size: 4.66,
  //         width: 156,
  //         height: 156,
  //       },
  //     },
  //     hash: 'lotus_a1a2e67523',
  //     ext: '.jpg',
  //     mime: 'image/jpeg',
  //     size: 37.35,
  //     url: '/https://i.picsum.photos/id/308/540/960.jpg?hmac=F8tIzE-s5FZnE_45--3auP0AUHWbIfE9OaLfcon_7vM',
  //     previewUrl: null,
  //     provider: 'local',
  //     provider_metadata: null,
  //     createdAt: '2022-05-27T06:51:08.965Z',
  //     updatedAt: '2022-05-27T06:51:08.965Z',
  //   },
  // ],
}
export const HorizontalArts = Template.bind({})
HorizontalArts.args = {
  artImages: [
    {
      id: 65,
      name: 'lotus.jpg',
      alternativeText: null,
      caption: null,
      width: 640,
      height: 640,
      formats: {
        small: {
          ext: '.jpg',
          url: '/https://i.picsum.photos/id/912/960/540.jpg?hmac=htLsujol_6f6GlqCPI6YFaPDXVwsqtHNDGktJgbT9Ts',
          hash: 'small_lotus_a1a2e67523',
          mime: 'image/jpeg',
          name: 'small_lotus.jpg',
          path: null,
          size: 27.52,
          width: 500,
          height: 500,
        },
        thumbnail: {
          ext: '.jpg',
          url: '/https://i.picsum.photos/id/912/960/540.jpg?hmac=htLsujol_6f6GlqCPI6YFaPDXVwsqtHNDGktJgbT9Ts',
          hash: 'thumbnail_lotus_a1a2e67523',
          mime: 'image/jpeg',
          name: 'thumbnail_lotus.jpg',
          path: null,
          size: 4.66,
          width: 156,
          height: 156,
        },
      },
      hash: 'lotus_a1a2e67523',
      ext: '.jpg',
      mime: 'image/jpeg',
      size: 37.35,
      url: '/https://i.picsum.photos/id/912/960/540.jpg?hmac=htLsujol_6f6GlqCPI6YFaPDXVwsqtHNDGktJgbT9Ts',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      createdAt: '2022-05-27T06:51:08.965Z',
      updatedAt: '2022-05-27T06:51:08.965Z',
    },
  ],
}
export const MultiableArts = Template.bind({})
MultiableArts.args = {
  artImages: ART_MOCKS.data[4].images,
}
