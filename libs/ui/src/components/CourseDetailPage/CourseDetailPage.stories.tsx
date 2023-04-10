import { Meta, Story } from '@storybook/react'

import { COURSE_MOCKS } from '@wsvvrijheid/mocks'

import { CourseDetailPage } from './CourseDetailPage'
import { CourseDetailPageProps } from './types'
// import { SOURCE_MOCKS } from '../../mocks'
export default {
  title: 'Forms/CourseDetailPage',
  component: CourseDetailPage,
} as Meta<CourseDetailPageProps>

const Template: Story<CourseDetailPageProps> = args => (
  <CourseDetailPage {...args} />
)

export const Default = Template.bind({})

Default.args = {
  course: COURSE_MOCKS.data[0],
  // source: SOURCE_MOCKS.platforms.academy,
}
