import { useRef, useState } from 'react'

import { useDisclosure } from '@chakra-ui/react'
import slugify from '@sindresorhus/slugify'
import { Story, Meta } from '@storybook/react'
import { CATEGORY_MOCKS } from '@wsvvrijheid/mocks'
import { Art, ArtCreateInput } from '@wsvvrijheid/types'
import { createMutation } from '@wsvvrijheid/utils'

import { CreateArtForm } from '.'
import { CreateArtFormProps, CreateArtFormFieldValues } from './types'

export default {
  title: 'Forms/CreateArtForm',
  component: CreateArtForm,
} as Meta<CreateArtFormProps>

const Template: Story<CreateArtFormProps> = args => {
  const [isLoading, setIsLoading] = useState(false)
  const createArtCancelRef = useRef<HTMLButtonElement>(null)
  const createArtFormDisclosure = useDisclosure()

  const handleCreateArt = async (
    data: CreateArtFormFieldValues & { images: Blob[] },
  ) => {
    const slug = slugify(data.title)
    const formBody = {
      ...data,
      slug,
      artist: 1,
      categories: data.categories.map(c => Number(c.value)),
    }

    await createMutation<Art, ArtCreateInput>('api/arts', formBody)

    setIsLoading(true)
    setTimeout(() => {
      alert(JSON.stringify(data))
      setIsLoading(false)
    }, 2000)
  }

  return (
    <CreateArtForm
      {...args}
      onCreateArt={handleCreateArt}
      isLoading={isLoading}
      categories={CATEGORY_MOCKS.data}
      cancelRef={createArtCancelRef}
      formDisclosure={createArtFormDisclosure}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}

export const Auth = Template.bind({})
Auth.args = {
  isLoggedIn: true,
}
