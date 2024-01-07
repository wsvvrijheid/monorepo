import { Flex, Image, Stack, Heading, Text } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  return (
    <Flex shadow="lg" direction={{ base: 'column', sm: 'row' }}>
      <Stack
        w={{ base: '100%', sm: '30%' }}
        display="flex"
        justify="center"
        align="center"
      >
        <Image
          boxSize={{ base: '2xs', sm: 'xs' }}
          objectFit={{ base: 'none', sm: 'cover' }}
          borderRadius={{ base: 'full', sm: 'none' }}
          p={1}
          src={randomPic}
          alt="random pic"
        />
      </Stack>

      <Stack w={{ base: '100%', sm: '70%' }} p={2}>
        <Heading
          as="h1"
          size="lg"
          mb={4}
          color="#000"
          fontWeight="500"
          textAlign={{ base: 'center', sm: 'inherit' }}
        >
          This is Heading...
        </Heading>
        <Text p={1.5}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Stack>
    </Flex>
  )
}
