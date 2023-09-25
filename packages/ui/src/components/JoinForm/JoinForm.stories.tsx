import { useState } from 'react'

import { Meta, StoryFn, StoryObj } from '@storybook/react'
import { useRouter } from 'next/router'

import { JOB_MOCKS, PLATFORM_MOCKS } from '@wsvvrijheid/mocks'
import { Job } from '@wsvvrijheid/types'

import { JoinForm } from './JoinForm'
import { JoinFormFieldValues, JoinFormFProps } from './types'

export default {
  title: 'Forms/JoinForm',
  component: JoinForm,
  args: {
    platforms: PLATFORM_MOCKS.data,
    jobs: JOB_MOCKS.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<typeof JoinForm>

type Story = StoryObj<typeof JoinForm>

const StoryWithHook: StoryFn<JoinFormFProps> = args => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { locale } = useRouter()

  const platforms = PLATFORM_MOCKS.data
  const jobs = JOB_MOCKS.data as Job[]
  const onSubmit = (data: JoinFormFieldValues) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    alert(JSON.stringify(data))
  }

  return (
    <JoinForm
      locale={args.locale || locale}
      onSubmitHandler={onSubmit}
      isLoading={isLoading}
      platforms={platforms}
      jobs={jobs}
    />
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
