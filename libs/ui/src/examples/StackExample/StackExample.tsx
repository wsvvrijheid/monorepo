import { Box, Flex, Image, Stack } from '@chakra-ui/react'

export const StackExample = () => {
  const randomPic = 'https://picsum.photos/400/300'

  return (
    <Flex p={7} gap={2} flexDirection={['column', null, null, 'row-reverse']}>
      <Image
        w={['full', null, null, '400px']}
        h={['200px', null, null, '300px']}
        src={randomPic}
      />

      <Stack spacing={2} align="stretch" w="100%">
        <Box h="40px" bg="blue.400">
          1
        </Box>
        <Box h="200px" bg="green.400" display={['none', null, null, 'block']}>
          2
        </Box>
        <Box>
          <Stack
            spacing={2}
            justifyContent="space-around"
            direction={['column', null, null, 'row']}
          >
            <Box w="100%" h="44px" bg="orange.500">
              1
            </Box>
            <Box w="100%" h="44px" bg="orange.500">
              2
            </Box>
            <Box w="100%" h="44px" bg="orange.500">
              3
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}
