import { Flex, Image, Stack, Heading, Text, Center } from '@chakra-ui/react'

export const ResponsiveCard = () => {
  const randomPic = 'https://picsum.photos/600/400'

  return (
    <>
      <Flex shadow="lg" direction={{base: "column", md: "row"}}>
        <Stack w={{base: "100%", md: "30%"}} display="flex" justify="center" align="center">
          <Image 
            boxSize="100%"
            objectFit="cover"
            p={1}
            src={randomPic} 
            alt="random pic" 
            />
        </Stack>

        <Stack w={{base: "100%", md: "70%"}}>
          <Heading as="h1" size="lg" mb={4} color="#000" fontWeight="500" textAlign={{base: "center", md: "inherit"}}>
            This is Heading...
          </Heading>
          <Text p={1.5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </Stack>
      </Flex>

      <Flex direction="column" w={250} mt={4} shadow="lg">
        <Center m={3} border="none">
          <Image 
            objectFit="cover"
            borderRadius="full" 
            boxSize={180} 
            src={randomPic} 
            alt='random pic two' />
        </Center>
        <Stack mt={5} pb={10} px={1.5}>
          <Heading as="h2" size="md" mb={2}>This is Heading #2 and it&apos;s supposed to be longer</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil eius quidem, ab culpa esse voluptatem velit reiciendis libero ex at quia praesentium voluptas facilis labore sapiente, aut maxime molestias. Magni est harum pariatur quisquam praesentium mollitia, labore quasi. Officiis, ea commodi ipsa et doloremque libero est harum quaerat corporis nisi inventore sit, asperiores, dolore aperiam delectus amet molestias quidem fugiat sunt! Alias a, vitae dolorem itaque quisquam repellat nam ipsum autem exercitationem dolor numquam ea?
          </Text>
        </Stack>

      </Flex>
    </>
  )
}
