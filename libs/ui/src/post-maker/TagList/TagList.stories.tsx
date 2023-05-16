import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { useHashtagContext } from '@wsvvrijheid/context'

import { TagList } from './TagList'

export default {
  title: 'PostMaker/TagList',
  component: TagList,
} as Meta<typeof TagList>

type Story = StoryObj<typeof TagList>

const StoryWithHooks: StoryFn<typeof TagList> = args => {
  const { activePostId, removeMentionFromPost } = useHashtagContext()

  const handleClick = (tag: string) => {
    if (!activePostId) return
    // Dispatching won't trigger the action in redux store.
    // It should be working in a real app. (see PostContainerMentionTags.tsx)
    // You need to make sure if dispatch is working in the parent component.
    // You can still see the action in storybook action tab.

    removeMentionFromPost(activePostId, tag)
  }

  // if (!mentions.data?.length) return <></>

  // const mentionUsernames = mentions.data.map(mention => mention.username)

  return <TagList tags={[]} onClickButton={handleClick} />
}

export const Default: Story = {
  render: StoryWithHooks,
}
