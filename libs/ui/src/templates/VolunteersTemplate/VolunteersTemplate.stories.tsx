import { Story, Meta } from '@storybook/react'

import {
  VolunteersTemplate,
  VolunteersTemplateProps,
} from './VolunteersTemplate'

export default {
  component: VolunteersTemplate,
  title: 'Templates/VolunteersTemplate',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<VolunteersTemplateProps>

const Template: Story<VolunteersTemplateProps> = args => {
  return <VolunteersTemplate {...args} />
}

export const Default = Template.bind({})
Default.args = {
  seo: {
    title: 'SamenVVV',
  },
  volunteers: [
    {
      id: 143,
      username: 'Bahtsiz',
      name: 'Bahtsiz kemal',
      email: null,
      bio: null,
      occupation: 'Developer',
      phone: null,
      country: 'NL',
      availableHours: 4,
      heardFrom: null,
      comment: null,
      linkedin: null,
      twitter: null,
      instagram: null,
      facebook: null,
      inMailingList: false,
      approved: true,
      isPublic: null,
      createdAt: '2022-03-11T08:26:24.633Z',
      updatedAt: '2022-03-18T00:33:06.025Z',
      publishedAt: '2022-03-11T08:26:26.519Z',
      user: null,
      translator: null,
      jury: null,
      author: null,
      jobs: [
        {
          id: 122,
          code: 'developer',
          name_en: 'Developer',
          name_nl: 'Ontwikkelaar',
          name_tr: 'Geliştirici',
          description_en: null,
          description_nl: null,
          description_tr: null,
          createdAt: '2022-03-10T16:07:15.577Z',
          updatedAt: '2022-03-10T16:07:16.167Z',
          publishedAt: '2022-03-10T16:07:16.165Z',
        },
      ],
      artEditor: null,
    },
  ],
  jobs: [
    {
      id: 122,
      code: 'developer',
      name_en: 'Developer',
      name_nl: 'Ontwikkelaar',
      name_tr: 'Geliştirici',
      description_en: null,
      description_nl: null,
      description_tr: null,
      createdAt: '2022-03-10T16:07:15.577Z',
      updatedAt: '2022-03-10T16:07:16.167Z',
      publishedAt: '2022-03-10T16:07:16.165Z',
    },
  ],
}
