import { StoryObj, StoryFn, Meta } from '@storybook/react'

import {
  GridPostMakerTweetCard,
  GridPostMakerTweetCardProps,
} from './GridPostMakerTweetCard'
export default {
  title: 'Admin/GridPostMakerTweetCard',
  component: GridPostMakerTweetCard,
} as Meta<GridPostMakerTweetCardProps>

type Story = StoryObj<GridPostMakerTweetCardProps>

const Template: StoryFn<GridPostMakerTweetCardProps> = args => (
  <GridPostMakerTweetCard {...args} />
)

export const Default: Story = {
  render: Template,
  args: {
    tweets: [
      {
        content:
          'Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. ',
        mentions: ['NOS', 'BedelliOzgurluk'],
        trends: ['Askeriogrenciler ozgurluk'],
        image:
          'https://s3-alpha-sig.figma.com/img/4307/7efc/023ad8bafabe8fd2b15f9f59fd8c6199?Expires=1684108800&Signature=IpCXjDJxbdynAF6E0ZV2d8qL2ZdY8iWxCjwiG9~rjIYWQFTgqOMTE~5PLoatFFF7cD7H3l5Zw5oxiLJ7GnO~7zrCmEZXZGk6kwDN~r0d1yQeECgafBo-Ch5~ou5oDh0Pydu-Cip8pVQ49-5zj43VTXdn0bfaQUojuW7KWKyx6eMj-Vn5ZltDyvBsqtqPxmW9fAFqxuYNM10yIehShxkFOmlwi74yUKgjqlPTqNHSIXvUbjdb1C9jUHZAFqmZyDMTNcqHAwRybDll5XJgreAA1aUYT3I92wfOMOLmKiDAuUK168Vxm147VjMBfLEciPmesJPR6OpLE4GJXHIDMuvkwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        handleMentionClick: (mention: string) => alert(mention),
        handleTrendClick: (trend: string) => alert(trend),
        addMention: () => alert('add mention'),
        addTrend: () => alert('add trend'),
        showStats: () => alert('show stats'),
      },
      {
        content:
          'Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. ',
        mentions: ['NOS', 'BedelliOzgurluk'],
        trends: ['Askeriogrenciler ozgurluk'],
        image:
          'https://s3-alpha-sig.figma.com/img/4307/7efc/023ad8bafabe8fd2b15f9f59fd8c6199?Expires=1684108800&Signature=IpCXjDJxbdynAF6E0ZV2d8qL2ZdY8iWxCjwiG9~rjIYWQFTgqOMTE~5PLoatFFF7cD7H3l5Zw5oxiLJ7GnO~7zrCmEZXZGk6kwDN~r0d1yQeECgafBo-Ch5~ou5oDh0Pydu-Cip8pVQ49-5zj43VTXdn0bfaQUojuW7KWKyx6eMj-Vn5ZltDyvBsqtqPxmW9fAFqxuYNM10yIehShxkFOmlwi74yUKgjqlPTqNHSIXvUbjdb1C9jUHZAFqmZyDMTNcqHAwRybDll5XJgreAA1aUYT3I92wfOMOLmKiDAuUK168Vxm147VjMBfLEciPmesJPR6OpLE4GJXHIDMuvkwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
        handleMentionClick: (mention: string) => alert(mention),
        handleTrendClick: (trend: string) => alert(trend),
        addMention: () => alert('add mention'),
        addTrend: () => alert('add trend'),
        showStats: () => alert('show stats'),
      },
    ],
  },
}
