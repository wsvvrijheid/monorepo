import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '../../mocks/strapi'
import { ArtContent } from './ArtContent'

export default {
  component: ArtContent,
  title: 'Shared/ArtContent',
  args: {
    art: ART_MOCKS.data[0],
  },
} as ComponentMeta<typeof ArtContent>

const Template: ComponentStory<typeof ArtContent> = args => {
  const { title, content, artist } = ART_MOCKS.data[0]

  const user = USER_MOCKS.find(user => user.avatar?.url)

  return (
    <ArtContent
      {...args}
      title={title}
      content={content}
      artistName={artist?.name || user?.username || 'Unknown'}
      artistAvatar={`${process.env['NX_API_URL']}${user?.avatar?.url}`}
    />
  )
}

export const Default = Template.bind({})

Default.args = {
  title: ART_MOCKS.data[0].title,
  content: ART_MOCKS.data[0].content,
  artistName:
    ART_MOCKS.data[0].artist?.name || ART_MOCKS.data[0].artist?.user?.username,
  artistAvatar: ART_MOCKS.data[0].artist?.user?.avatar?.url,
  artistProfilePath: `/artist/${ART_MOCKS.data[0].artist?.user?.username}`,
}
