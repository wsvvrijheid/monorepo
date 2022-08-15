import { ComponentStory, ComponentMeta } from '@storybook/react'

import { PageHeader } from './index'

export default {
  component: PageHeader,
  title: 'Admin/PageHeader',
  args: {
    images: [
      {
        slug: 'tr',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Flag_of_the_Ottoman_Empire_%281844%E2%80%931922%29.svg/200px-Flag_of_the_Ottoman_Empire_%281844%E2%80%931922%29.svg.png',
      },
      {
        slug: 'en',
        url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Flag_of_the_United_Kingdom_%283-5%29.svg/640px-Flag_of_the_United_Kingdom_%283-5%29.svg.png',
      },
      {
        slug: 'nl',
        url: 'https://www.hollandavesen.nl/binaries/large/content/gallery/netherlandsandyou/content-afbeeldingen/algemeen/vlag-nederland.png',
      },
    ],
  },
} as ComponentMeta<typeof PageHeader>

const Template: ComponentStory<typeof PageHeader> = args => {
  return <PageHeader {...args} />
}

export const Default = Template.bind({})
Default.args = {
  title: 'News',

  onSearch: (item: string) => {
    alert(item)
  },

  onFilter: (filter: string) => {
    alert('Filter by ' + filter)
  },
  onSort: (sort: string) => {
    alert('Sort by ' + sort)
  },
  onLanguageChange: (slug: string) => {
    alert('Laguage changed to ' + slug)
  },
  createNew: (name: string) => {
    alert(name)
  },
  filterOptions: ['Filter by Date', 'Filter by Author', 'Filter by Published'],
  sortOptions: ['Ascending', 'Descending'],
  buttons: ['Create news +'],
}
