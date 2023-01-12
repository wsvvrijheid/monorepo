import { SimpleGrid } from '@chakra-ui/react'
import { AdminLayout, OgImage } from '@wsvvrijheid/ui'

const Index = () => {
  const text =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, nisl eget ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl eu nisl.'

  return (
    <AdminLayout title="Dashboard">
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        gap={8}
        bg={'white'}
        shadow={'md'}
        p={4}
      >
        <OgImage title={'Scale 2'} scale={2} text={text} />
        <OgImage title={'Scale 1'} text={text} />
        <OgImage title={'Scale 0.5'} scale={0.5} text={text} />
        <OgImage title={'Scale 0.3'} scale={0.3} text={text} />
        <OgImage title={'Scale 0.2'} scale={0.2} text={text} />
      </SimpleGrid>
    </AdminLayout>
  )
}

export default Index
