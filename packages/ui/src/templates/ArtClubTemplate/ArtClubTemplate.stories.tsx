import { Meta, Story } from '@storybook/react'

import { ArtClubTemplate } from './ArtClubTemplate'

export default {
  component: ArtClubTemplate,
  title: 'Templates/ArtClubTemplate',
  parameters: {
    nextRouter: {
      locale: 'en',
      query: {
        page: 1,
      },
    },
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<typeof ArtClubTemplate>

const Template: Story<typeof ArtClubTemplate> = _ => {
  return <ArtClubTemplate />
}

export const Default = Template.bind({})

export const InitialCategories = Template.bind({})
InitialCategories.parameters = {
  nextRouter: {
    locale: 'en',
    query: {
      page: 3,
      categories: '0=photo&1=nature',
    },
  },
}
