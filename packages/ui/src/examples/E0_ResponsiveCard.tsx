import { Flex, Image, Stack, Heading, Text } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  return (
    <Flex
      w={{ md: '100%' }}
      p={{ base: 5, md: 0 }}
      flexDir={{ base: 'column', md: 'row' }}
      boxShadow="md"
      bg="white"
    >
      <Stack>
        <Image
          src={randomPic}
          alt="randomPicDesc"
          objectFit="cover"
          w={{ base: '70%', md: '40%' }}
          m={{ base: 'auto', md: 'none' }}
          aspectRatio={{ base: 1, md: 'none' }}
          borderRadius={{ base: 'full', md: 'none' }}
        />
      </Stack>
      <Stack dir="column" m={4}>
        <Heading fontSize="xl" fontWeight="bold">
          This is Heading... Lorem ipsum dolor sit.
        </Heading>
        <Text mt={2}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi
          dolores totam blanditiis soluta quae delectus doloremque velit sit
          corrupti iure natus nobis nesciunt, tempore repellat cupiditate culpa
          voluptatum expedita.
        </Text>
      </Stack>
    </Flex>
  )
}
