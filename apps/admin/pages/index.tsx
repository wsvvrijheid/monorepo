import { SimpleGrid, useToken } from '@chakra-ui/react'
import { AdminLayout, OgImage } from '@wsvvrijheid/ui'

const Index = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl.'

  const blue = useToken('colors', ['blue.700', 'blue.100'])

  return (
    <AdminLayout title="Dashboard">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} shadow={'md'} p={4}>
        <OgImage
          title={'Scale 1'}
          text={text}
          shape={1}
          randomImage
          flip
          bg={'white'}
          color={'black'}
          hasLine
        />
        <OgImage
          title={'Scale 0.5'}
          bg={blue[1]}
          color={blue[0]}
          scale={0.5}
          text={text}
          shape={2}
          randomImage
          flip
          hasLine={false}
        />
      </SimpleGrid>
    </AdminLayout>
  )
}

export default Index
