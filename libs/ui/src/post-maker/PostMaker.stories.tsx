import { useBreakpointValue } from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { ComponentMeta, ComponentStory } from '@storybook/react'

import { StepsContent } from '../components'
import { usePostMakerSteps } from '../hooks'
import { PostMaker } from './PostMaker'

export default {
  title: 'PostMaker/PostMaker',
  component: PostMaker,
} as ComponentMeta<typeof PostMaker>

const Template: ComponentStory<typeof PostMaker> = () => {
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

export const Default = Template.bind({})
