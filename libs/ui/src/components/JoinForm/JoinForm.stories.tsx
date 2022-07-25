import React from 'react'

import { Story, ComponentMeta } from '@storybook/react'

import { JoinForm } from './JoinForm'
import { JoinFormFieldValues, JoinFormFProps } from './types'
import { Job, Project, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { JOB_MOCKS, PROJECT_MOCKS } from '../../mocks'

export default {
  title: 'Forms/JoinForm',
  component: JoinForm,
  args: {
    projects: PROJECT_MOCKS.data,
    jobs: JOB_MOCKS.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as ComponentMeta<typeof JoinForm>

const Template: Story<JoinFormFProps> = args => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  const { locale } = useRouter()

  const projects = PROJECT_MOCKS.data as Project[]
  const jobs = JOB_MOCKS.data as Job[]
  const onSubmit = (data: JoinFormFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    console.log({ data })
    alert(JSON.stringify(data))
  }
  return (
    <JoinForm
      locale={args.locale || (locale as StrapiLocale)}
      onSubmitHandler={onSubmit}
      isLoading={isLoading}
      projects={projects}
      jobs={jobs}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
