import { Flex, Image, Stack, Heading, Text, useBreakpointValue } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  const horizontalBuild = {
    baseFlex: {
      flexDirection: 'row',
      w: '100%',
      h: '100%',
      justifyContent: 'start',
      alignItems: 'start'
    },
    image: {
      w: '300px',
      h: '100%',
      objectFit: 'cover'
    }
  };

  const verticalBuild = {
    baseFlex: {
      flexDirection: 'column',
      w: '347px',
      h: '707px',
      justifyContent: 'center',
      alignItems: 'center'
    },
    image: {
      boxSize: '200px',
      borderRadius: 'full'
    }
  }

  const props = useBreakpointValue({
    sm: horizontalBuild,
    base: verticalBuild,
  });

  return (
    <Flex m={8} sx={props.baseFlex} >
      <Stack flexShrink={0} >
        <Image sx={props.image} src={randomPic} alt="random pic"
        />
      </Stack>

      <Stack p={8} flexGrow={1}>
        <Heading as="h1" mb={5} color="#000" fontWeight="500" fontSize="xl">
          The standard Lorem Ipsum passage, used since the 1500s
        </Heading>
        <Text fontSize="md">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </Stack>
    </Flex>
  )
}
