import { Divider, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react'

export const ResponsiveCardExample = () => {
  return (
    <Flex
      flexDirection={['column', null, 'row']}
      gap={3}
      bg="white"
      m={3}
      p={5}
    >
      <Stack>
        <Image
          w={['350px', null, 'full']}
          h={['350px', null, 'full']}
          src="https://picsum.photos/600/400"
          borderRadius={['full', null, 'none']}
          m="auto"
        ></Image>
      </Stack>
      <Stack spacing={7} w={['full', null]} p={3}>
        <Heading as="h1">Heading</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam,
          nulla excepturi quam, magnam harum non blanditiis aspernatur quas
          illum cum tempore earum dolores molestiae suscipit ipsum provident
          deserunt sunt odio! Aliquid repudiandae perspiciatis dolor possimus
          aut nostrum earum repellendus fugiat provident ea necessitatibus ipsam
          soluta in quod nam nisi deleniti, est magnam quaerat eligendi et
          itaque nulla? Voluptatum, minima voluptate. Iste ipsum cum praesentium
          non accusantium, quasi voluptate natus vero, animi adipisci maiores,
          repellat perspiciatis quia obcaecati! Magnam, saepe asperiores quia
          optio, a enim, quasi eos non aut sapiente laudantium? Adipisci
          excepturi facere optio qui deleniti maxime minima omnis voluptates
          sequi repudiandae nobis quaerat reprehenderit molestiae nostrum
          voluptatibus amet, alias commodi vero dolore animi quo porro voluptas
          dolor ab. Nobis. Molestiae deserunt unde dolores animi, tenetur
          similique! Vero, facilis alias nam id pariatur autem nihil? Ab hic
          aspernatur voluptatem. Voluptates ea labore maiores vel soluta quaerat
          delectus maxime dicta enim.
        </Text>
      </Stack>
    </Flex>
  )
}
