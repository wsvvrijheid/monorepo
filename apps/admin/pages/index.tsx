import { SimpleGrid } from '@chakra-ui/react'
import { AdminLayout, Caps } from '@wsvvrijheid/ui'

const Index = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl.'

  return (
    <AdminLayout title="Dashboard">
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={8} shadow={'md'} p={4}>
        <Caps
          imageParams={{
            title: 'Scale 1',
            text,
            shape: 1,
            randomImage: true,
            flip: true,
            bg: 'white',
            color: 'black',
            hasLine: true,
          }}
          hasRandomImage
        />
        <Caps
          imageParams={{
            title: 'Scale 0.5',
            text,
            shape: 2,
            randomImage: true,
            flip: true,
            bg: 'white',
            color: 'black',
            hasLine: true,
          }}
          hasRandomImage
        />
      </SimpleGrid>
    </AdminLayout>
  )
}

export default Index
