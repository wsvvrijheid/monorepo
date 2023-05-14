import { StoryFn, Meta } from '@storybook/react'
import { sample } from 'lodash'

import { ASSETS_URL } from '@wsvvrijheid/config'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { Art } from '@wsvvrijheid/types'

import { ArtContent } from './ArtContent'

const art = sample(ART_MOCKS.data) as Art

export default {
  component: ArtContent,
  title: 'Shared/ArtContent',
  args: {
    art,
  },
} as Meta<typeof ArtContent>

const Template: StoryFn<typeof ArtContent> = args => {
  const { title_en, description_en, artist } = art

  const user = USER_MOCKS.find(user => user.avatar?.url)

  return (
    <ArtContent
      {...args}
      title={title_en}
      description={description_en}
      artistName={artist?.name || user?.username || 'Unknown'}
      artistAvatar={`${ASSETS_URL}${user?.avatar?.url}`}
      artistProfilePath={`/artist/${user?.username}`}
    />
  )
}

export const Default = Template.bind({})
