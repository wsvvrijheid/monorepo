import { StoryObj, Meta } from '@storybook/react'
import { sample } from 'lodash'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { Art } from '@wsvvrijheid/types'

import { ArtContent } from './ArtContent'

const art = sample(ART_MOCKS.data) as Art
const user = USER_MOCKS.find(user => user.avatar?.url)

export default {
  component: ArtContent,
  title: 'Shared/ArtContent',
  args: {
    art,
  },
} as Meta<typeof ArtContent>

type Story = StoryObj<typeof ArtContent>

export const Default: Story = {
  args: {
    title: art.title_en,
    description: art.description_en,
    artistName: art.artist?.name || art.artist?.username || 'Unknown',
    artistAvatar: `${ASSETS_URL}${user?.avatar?.url}`,
    artistProfilePath: `/artist/${art.artist?.username}`,
  },
}
