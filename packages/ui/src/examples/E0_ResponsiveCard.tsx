import {
  Flex,
  Image,
  Stack,
  Heading,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

export const ResponsiveCard = () => {
  const randomPic =
    "https://www.formica.com/-/media/project/formica/emea/products/swatch-images/f2828/f2828-swatch.jpg";
  const isWideVersion = useBreakpointValue({ base: false, md: true });
  
  return isWideVersion ? (
    <Flex boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)" flexDirection="row">
      <Image src={randomPic} alt="random pic" objectFit="cover" width="250px" />

      <Stack p={4}>
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
  ) : (
    <Flex
      margin="50px auto"
      boxShadow="sm"
      flexDirection="column"
      align="center"
      w="70%"
    >
      <Stack position="relative" overflow="hidden" borderRadius="50%" mt={5}>
        <Image
          borderRadius="full"
          boxSize="200px"
          src={randomPic}
          alt="random picture"
        />
      </Stack>

      <Stack p={4} w="100%">
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
