import { Meta, StoryObj, StoryFn } from '@storybook/react'

import {
  removeMentionFromPost,
  useAppDispatch,
  useHashtagSelector,
} from '@wsvvrijheid/store'

import { TagList } from './TagList'

export default {
  title: 'PostMaker/TagList',
  component: TagList,
} as Meta<typeof TagList>

type Story = StoryObj<typeof TagList>

const StoryWithHooks: StoryFn<typeof TagList> = args => {
  const { mentions, currentPostId } = useHashtagSelector()

  const dispatch = useAppDispatch()

  const handleClick = (tag: string) => {
    if (!currentPostId) return
    // Dispatching won't trigger the action in redux store.
    // It should be working in a real app. (see PostContainerMentionTags.tsx)
    // You need to make sure if dispatch is working in the parent component.
    // You can still see the action in storybook action tab.
    dispatch(
      removeMentionFromPost({
        postId: currentPostId,
        mention: tag,
      }),
    )
  }

  if (!mentions.data?.length) return <></>

  const mentionUsernames = mentions.data.map(mention => mention.username)

  return <TagList tags={mentionUsernames} onClickButton={handleClick} />
}

export const Default: Story = {
  render: StoryWithHooks,
}
