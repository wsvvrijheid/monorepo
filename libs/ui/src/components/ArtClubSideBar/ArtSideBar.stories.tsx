import { useState } from 'react'

import {
  Box,
  Center,
  Code,
  Grid,
  Heading,
  HStack,
  Spinner,
  VStack,
} from '@chakra-ui/react'
import { Story, Meta } from '@storybook/react'
import { useRouter } from 'next/router'

import { ArtSideBar, ArtSideBarProps } from './ArtSideBar'

export default {
  component: ArtSideBar,
  title: 'Shared/ArtSideBar',
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<ArtSideBarProps>

const Template: Story<ArtSideBarProps> = args => {
  const [isLoading, setIsLoading] = useState(false)
  const { query } = useRouter()

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <ArtSideBar
          {...args}
          isLoading={args.isLoading || isLoading}
          setIsLoading={setIsLoading}
        />
      </Box>
      <Center>
        <VStack>
          <Heading size="md">Selected Categories</Heading>
          <HStack w="50%">
            {isLoading && <Spinner />}
            <Code>{`Because of the storybook we can not observe the changes in router,
            but you can see that 'push' function of 'router' called with selected 
            categories in Actions Tab below.`}</Code>
          </HStack>
          <HStack>
            {isLoading && <Spinner />}
            <Code>{JSON.stringify(query, null, 2)}</Code>
          </HStack>
        </VStack>
      </Center>
    </Grid>
  )
}

export const Default = Template.bind({})

export const InitialCategories = Template.bind({})
InitialCategories.parameters = {
  nextRouter: {
    query: {
      categories: '0=painting&1=nature',
    },
  },
}
