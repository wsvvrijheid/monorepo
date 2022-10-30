import { ComponentMeta, ComponentStory } from '@storybook/react'
import {
  removeMentionUsername,
  useAppDispatch,
  usePostSelector,
} from '@wsvvrijheid/store'

import { TagList } from './TagList'

export default {
  title: 'PostMaker/TagList',
  component: TagList,
} as ComponentMeta<typeof TagList>

const Template: ComponentStory<typeof TagList> = args => {
  const { mentionUsernames } = usePostSelector()

  const dispatch = useAppDispatch()

  const handleClick = (tag: string) => {
    // Dispatching won't trigger the action in redux store.
    // It should be working in a real app. (see PostContainerMentionTags.tsx)
    // You need to make sure if dispatch is working in the parent component.
    // You can still see the action in storybook action tab.
    dispatch(removeMentionUsername(tag))
  }

  return <TagList tags={mentionUsernames} onClickButton={handleClick} />
}

export const Default = Template.bind({})
