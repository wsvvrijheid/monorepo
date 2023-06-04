import { useBreakpointValue } from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { Meta, StoryFn, StoryObj } from '@storybook/react'

import { PostMaker } from './PostMaker'
import { StepsContent } from '../components'
import { usePostMakerSteps } from '../hooks'

export default {
  title: 'PostMaker/PostMaker',
  component: PostMaker,
} as Meta<typeof PostMaker>

type Story = StoryObj<typeof PostMaker>

const StoryWithHook: StoryFn<typeof PostMaker> = () => {
  const isMobile = useBreakpointValue({ base: true, lg: false })
  const postMakerSteps = usePostMakerSteps()

  const steps = isMobile ? postMakerSteps.mobile : postMakerSteps.desktop

  return (
    <TourProvider
      steps={steps}
      components={{}}
      ContentComponent={StepsContent}
      padding={{ mask: 6 }}
      styles={{
        popover: base => ({
          ...base,
          padding: 4,
          backgroundColor: 'transparent',
        }),
      }}
    >
      <PostMaker />
    </TourProvider>
  )
}

export const Default: Story = {
  render: StoryWithHook,
}
