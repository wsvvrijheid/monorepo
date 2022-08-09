//import { useState } from 'react'

import { ArtApprovalForm, ArtApprvalFormTypes } from './ArtApprovalForm'

export default {
  component: ArtApprovalForm,
  title: 'Forms/ArtApprovalForm',
} as ArtApprovalForm<ArtApprvalFormTypes>

const Template: ArtApprovalForm<typeof any> = args => {
  //const [art, setArt] = useState(args.art)

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

  return <ArtApprovalForm {...args} />
}

export const Default = Template.bind({})
Default.args = {}
