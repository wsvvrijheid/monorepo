import { useState } from 'react'

import { Story, ComponentMeta } from '@storybook/react'
import { JOB_MOCKS, PLATFORM_MOCKS } from '@wsvvrijheid/mocks'
import { Job, StrapiLocale } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { JoinForm } from './JoinForm'
import { JoinFormFieldValues, JoinFormFProps } from './types'

export default {
  title: 'Forms/JoinForm',
  component: JoinForm,
  args: {
    projects: PLATFORM_MOCKS.data,
    jobs: JOB_MOCKS.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as ComponentMeta<typeof JoinForm>

const Template: Story<JoinFormFProps> = args => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { locale } = useRouter()

  const projects = PLATFORM_MOCKS.data
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
