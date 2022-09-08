import { Flex, Image, Stack, Heading, Text } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  return (
    <Flex
      boxShadow="sm"
      bg="white"
      p={10}
      gap={8}
      borderRadius="8px"
      flexDirection={['column', null, 'row']}
      m={5}
    >
      <Stack>
        <Image
          w={['300px', null, 'full']}
          h={['300px', null, 'full']}
          src={randomPic}
          borderRadius={['full', null, 'none']}
          m="auto"
        />
      </Stack>

      <Stack spacing={2} w={['full', null]}>
        <Heading as="h1" size="lg" mb={5} color="#000" fontWeight="500">
          This is Heading...
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dolores totam blanditiis soluta quae delectus doloremque velit sit
          corrupti iure natus nobis nesciunt, tempore repellat cupiditate culpa
          voluptatum expedita. Ducimus sapiente exercitationem repellendus et
          aspernatur. Aspernatur expedita a ea non iure aperiam assumenda
          praesentium beatae numquam repellat, excepturi impedit voluptatem!
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dolores totam blanditiis soluta quae delectus doloremque velit sit
          corrupti iure natus nobis nesciunt, tempore repellat cupiditate culpa
          voluptatum expedita. Ducimus sapiente exercitationem repellendus et
          aspernatur. Aspernatur expedita a ea non iure aperiam assumenda
          praesentium beatae numquam repellat, excepturi impedit voluptatem!
        </Text>
      </Stack>
    </Flex>
  )
}
