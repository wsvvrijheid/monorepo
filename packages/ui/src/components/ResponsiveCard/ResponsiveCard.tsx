import { Flex, Image, Stack, Heading, Text } from "@chakra-ui/react";

const ResponsiveCard = () => {
  const randomPic =
    "https://upload.wikimedia.org/wikipedia/en/3/34/Blue_%28film%29.png";

  return (
    <Flex
      margin="50px auto"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      flexDirection="row"
    >
      <Image
        src={randomPic}
        alt="random pic"
        objectFit="cover"
        w={{ base: "auto", md: "50%" }}
      />

      <Stack margin="20px">
        <Heading as="h1" size="lg" mb={5} color="#000" fontWeight="600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse?
        </Heading>
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias
          veritatis quidem voluptatibus nihil aperiam adipisci harum, labore
          perferendis. Sunt reiciendis dignissimos iure ut enim reprehenderit
          ratione ipsam officiis deserunt consectetur quam consequatur corporis
          pariatur facilis impedit magnam explicabo necessitatibus, sit vel
          tempora nam doloribus nesciunt cumque ex? Alias, aperiam placeat?
        </Text>
      </Stack>
    </Flex>
  );
};

const ResponsiveCardColumn = () => {
  const randomPic =
    "https://upload.wikimedia.org/wikipedia/en/3/34/Blue_%28film%29.png";

  return (
    <Flex
      margin="50px auto"
      boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
      flexDirection="column"
      align="center"
      maxW="347px"
      w="100%"
    >
      <Stack position="relative" overflow="hidden" borderRadius="50%" mt={5}>
        <Image
          borderRadius="full"
          boxSize="200px"
          src={randomPic}
          alt="Dan Abramov"
        />
      </Stack>

      <Stack p="20px" w="100%">
        <Heading as="h1" size="lg" mb={5} color="#000" fontWeight="600">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse?
        </Heading>
        <Text>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Natus a
          expedita iure, doloremque corporis nemo sint repellat voluptas
          sapiente eum assumenda minima earum officiis ut atque. Tenetur vel
          culpa exercitationem.
        </Text>
      </Stack>
    </Flex>
  );
};

export { ResponsiveCard, ResponsiveCardColumn };
