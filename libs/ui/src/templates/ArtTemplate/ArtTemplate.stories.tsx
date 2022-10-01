import { Meta, Story } from '@storybook/react'
import { ART_MOCKS } from '@wsvvrijheid/mocks'
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
