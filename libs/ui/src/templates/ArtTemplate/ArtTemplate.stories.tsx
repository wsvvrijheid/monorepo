import { Meta, Story } from '@storybook/react'
import { ART_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import { sample } from 'lodash'

import { ArtTemplate, ArtTemplateProps } from './ArtTemplate'

const sampleArt = sample(ART_MOCKS.tr.data)

export default {
  component: ArtTemplate,
  title: 'Templates/ArtTemplate',
  parameters: {
    nextRouter: {
      path: `club/art/:slug`,
      asPath: `club/art/${sampleArt.slug}`,
      locale: sampleArt.locale,
      query: {
        slug: sampleArt.slug,
      },
    },
  },
} as Meta<ArtTemplateProps>

const Template: Story<ArtTemplateProps> = args => {
  return <ArtTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {} as ArtTemplateProps

export const Auth = Template.bind({})
Auth.args = {
  auth: {
    isLoggedIn: true,
    user: sample(USER_MOCKS),
    token: 'mock-token',
  },
} as ArtTemplateProps
