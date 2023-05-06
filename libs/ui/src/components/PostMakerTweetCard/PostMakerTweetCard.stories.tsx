import { Stack } from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'

import {
  PostMakerTweetCard,
  PostMakerTweetCardProps,
} from './PostMakerTweetCard'

export default {
  title: 'Admin/PostMakerTweetCard',
  component: PostMakerTweetCard,
} as Meta<PostMakerTweetCardProps>

const Template: Story<PostMakerTweetCardProps> = args => {
  return <PostMakerTweetCard {...args} />
}

export const Default = Template.bind({})
Default.args = {
  content:
    'Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. ',
  mentions: ['NOS', 'BedelliOzgurluk'],
  trends: ['Askeriogrenciler ozgurluk'],
  image:
    'https://s3-alpha-sig.figma.com/img/4307/7efc/023ad8bafabe8fd2b15f9f59fd8c6199?Expires=1684108800&Signature=IpCXjDJxbdynAF6E0ZV2d8qL2ZdY8iWxCjwiG9~rjIYWQFTgqOMTE~5PLoatFFF7cD7H3l5Zw5oxiLJ7GnO~7zrCmEZXZGk6kwDN~r0d1yQeECgafBo-Ch5~ou5oDh0Pydu-Cip8pVQ49-5zj43VTXdn0bfaQUojuW7KWKyx6eMj-Vn5ZltDyvBsqtqPxmW9fAFqxuYNM10yIehShxkFOmlwi74yUKgjqlPTqNHSIXvUbjdb1C9jUHZAFqmZyDMTNcqHAwRybDll5XJgreAA1aUYT3I92wfOMOLmKiDAuUK168Vxm147VjMBfLEciPmesJPR6OpLE4GJXHIDMuvkwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
}

const Grid: Story<PostMakerTweetCardProps> = args => {
  const mockdata = [
    {
      content:
        'Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. ',
      mentions: ['NOS', 'BedelliOzgurluk'],
      trends: ['Askeriogrenciler ozgurluk'],
      image:
        'https://s3-alpha-sig.figma.com/img/4307/7efc/023ad8bafabe8fd2b15f9f59fd8c6199?Expires=1684108800&Signature=IpCXjDJxbdynAF6E0ZV2d8qL2ZdY8iWxCjwiG9~rjIYWQFTgqOMTE~5PLoatFFF7cD7H3l5Zw5oxiLJ7GnO~7zrCmEZXZGk6kwDN~r0d1yQeECgafBo-Ch5~ou5oDh0Pydu-Cip8pVQ49-5zj43VTXdn0bfaQUojuW7KWKyx6eMj-Vn5ZltDyvBsqtqPxmW9fAFqxuYNM10yIehShxkFOmlwi74yUKgjqlPTqNHSIXvUbjdb1C9jUHZAFqmZyDMTNcqHAwRybDll5XJgreAA1aUYT3I92wfOMOLmKiDAuUK168Vxm147VjMBfLEciPmesJPR6OpLE4GJXHIDMuvkwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
    {
      content:
        'Sit sit pellentesque venenatis eu sollicitudin integer netus. Ultrices scelerisque convallis massa amet libero aliquet. ',
      mentions: ['NOS', 'BedelliOzgurluk'],
      trends: ['Askeriogrenciler ozgurluk'],
      image:
        'https://s3-alpha-sig.figma.com/img/4307/7efc/023ad8bafabe8fd2b15f9f59fd8c6199?Expires=1684108800&Signature=IpCXjDJxbdynAF6E0ZV2d8qL2ZdY8iWxCjwiG9~rjIYWQFTgqOMTE~5PLoatFFF7cD7H3l5Zw5oxiLJ7GnO~7zrCmEZXZGk6kwDN~r0d1yQeECgafBo-Ch5~ou5oDh0Pydu-Cip8pVQ49-5zj43VTXdn0bfaQUojuW7KWKyx6eMj-Vn5ZltDyvBsqtqPxmW9fAFqxuYNM10yIehShxkFOmlwi74yUKgjqlPTqNHSIXvUbjdb1C9jUHZAFqmZyDMTNcqHAwRybDll5XJgreAA1aUYT3I92wfOMOLmKiDAuUK168Vxm147VjMBfLEciPmesJPR6OpLE4GJXHIDMuvkwA__&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4',
    },
  ]

  return (
    <Stack>
      {mockdata.map(tweet => (
        <PostMakerTweetCard {...tweet} />
      ))}
    </Stack>
  )
}

export const GridStory = Grid.bind({})
GridStory.args = {}
