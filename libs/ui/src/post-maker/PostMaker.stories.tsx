import { useBreakpointValue } from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { ComponentMeta, ComponentStory } from '@storybook/react'
import { getStepsMobilePostMaker, getStepsPostMaker } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'

import { StepsContent } from '../components'
import { PostMaker } from './PostMaker'

export default {
  title: 'PostMaker/PostMaker',
  component: PostMaker,
} as ComponentMeta<typeof PostMaker>

const Template: ComponentStory<typeof PostMaker> = () => {
  const { t } = useTranslation()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const steps = isMobile ? getStepsMobilePostMaker(t) : getStepsPostMaker(t)

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
