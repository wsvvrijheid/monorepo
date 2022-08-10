import { ComponentStory, ComponentMeta } from '@storybook/react'

import { ART_MOCKS, USER_MOCKS } from '../../mocks/strapi'
import { ArtApprovalForm } from './ArtApprovalForm'
export default {
  component: ArtApprovalForm,
  title: 'Admin/Forms/ArtApprovalForm',
  args: {
    art: ART_MOCKS.data[0],
    user: USER_MOCKS[0],
  },
} as ComponentMeta<typeof ArtApprovalForm>

const Template: ComponentStory<typeof ArtApprovalForm> = args => {
  //   const actions: ArtActions = {
  //     delete: {
  //       title: 'Delete',
  //       buttonText: 'Delete',
  //       colorScheme: 'red',
  //       text: 'Are you sure you want to delete this art?',
  //       onClick: () => alert('Deleted'),
  //     },
  //     publish: {
  //       title: 'Publish',
  //       buttonText: 'Publish',
  //       colorScheme: 'green',
  //       text: 'Are you sure you want to publish this art?',
  //       onClick: () => alert('Published'),
  //     },
  //     unpublish: {
  //       title: 'Unpublish',
  //       buttonText: 'Unpublish',
  //       colorScheme: 'red',
  //       text: 'Are you sure you want to unpublish this art?',
  //       onClick: () => alert('Unpublished'),
  //     },
  //   }

  return <ArtApprovalForm {...args} user={args.user} art={args.art} />
}

export const Default = Template.bind({})
Default.args = {}
