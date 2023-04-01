import { Box, Button, Container, useDisclosure } from '@chakra-ui/react'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { UploadFile } from '@wsvvrijheid/types'

import { ArtApprovalModal } from './ArtApprovalModal'

const artMock = ART_MOCKS.data[0]

export default {
  component: ArtApprovalModal,
  title: 'Admin/ArtApprovalModal',
  args: {
    art: artMock,
    artist: USER_MOCKS[1],
    editor: USER_MOCKS[0],
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
  const { art, editor, artist } = args
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box>
      <Button onClick={onOpen} m={4}>
        {`Open Modal`}
      </Button>
      <ArtApprovalModal
        {...args}
        art={art}
        editor={editor}
        artist={artist}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Box>
  )
}

export const Default = Template.bind({})
Default.args = {}
export const LongDescription = Template.bind({})
LongDescription.args = {
  art: {
    ...artMock,
    description_en: `Lorem ipsum odor amet, consectetuer adipiscing elit. Primis eros nunc fringilla id rutrum nibh.
    Orci convallis pulvinar urna fusce at purus neque nam leo? Suspendisse semper facilisi
    parturient sit euismod placerat. Orci ante luctus praesent torquent orci commodo aptent blandit.
    Placerat arcu dui potenti; nullam taciti taciti amet.`,
  },
}
export const VerticalArts = Template.bind({})
VerticalArts.args = {
  art: {
    ...artMock,
    image: {
      ...artMock.image,
      url: 'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
    } as UploadFile,
  },
}
export const MultiVerticalArts = Template.bind({})
MultiVerticalArts.args = {
  art: {
    ...artMock,
    image: {
      ...artMock.image,
      url: 'https://i.picsum.photos/id/852/540/960.jpg?hmac=AQA_lg0_rXzCOj29d_MPuZx1xUF9WEj2NdaNFdvQ3Ak',
    } as UploadFile,
  },
}
export const HorizontalArts = Template.bind({})
HorizontalArts.args = {
  art: {
    ...artMock,
    image: {
      ...artMock.image,
      url: 'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
    } as UploadFile,
  },
}
export const MultiHorizontalArts = Template.bind({})
MultiHorizontalArts.args = {
  art: {
    ...artMock,
    image: {
      ...artMock.image,
      url: 'https://i.picsum.photos/id/399/960/540.jpg?hmac=LO1r_Qur7tph6YG2YHUEF5bNTidhcuf38MBkgNhACOo',
    } as UploadFile,
  },
}
