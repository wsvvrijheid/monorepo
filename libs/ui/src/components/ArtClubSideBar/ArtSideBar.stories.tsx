import { useEffect, useState } from 'react'

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
import { CATEGORY_MOCKS, COLLECTION_MOCKS } from '@wsvvrijheid/mocks'
import { useRouter } from 'next/router'

import { useChangeParams } from '../../hooks'
import { ArtSideBar, ArtSideBarProps } from './ArtSideBar'

export default {
  component: ArtSideBar,
  title: 'Shared/ArtSideBar',
  args: {
    categoryData: CATEGORY_MOCKS.data,
    collectionData: COLLECTION_MOCKS.en.data,
  },
  argTypes: {
    locale: { control: { type: 'radio', options: ['en', 'nl', 'tr'] } },
  },
} as Meta<ArtSideBarProps>

const Template: Story<ArtSideBarProps> = args => {
  const changeParam = useChangeParams()
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    changeParam({ categories: selectedCategories })
  }, [selectedCategories, changeParam])

  const { query } = useRouter()

  const [initialCategories] = [
    (query['categories'] as string)
      ?.split('&')
      .map(category => category.split('=')[1]),
  ]

  return (
    <Grid gridTemplateColumns="300px 1fr">
      <Box bg="gray.100" p={4}>
        <ArtSideBar
          {...args}
          initialCategories={args.initialCategories || initialCategories}
          isLoading={args.isLoading || isLoading}
          setIsLoading={setIsLoading}
          setSelectedCategories={setSelectedCategories}
          debounce={1000}
        />
      </Box>
      <Center>
        <VStack>
          <Heading size="md">Selected Categories</Heading>
          <HStack>
            {isLoading && <Spinner />}
            <Code>{JSON.stringify(selectedCategories, null, 2)}</Code>
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

export const Debounced = Template.bind({})
Debounced.args = {
  debounce: 3000,
}
