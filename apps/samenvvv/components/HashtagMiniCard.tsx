import { Card, Container, Heading, Stack, Text } from '@chakra-ui/react'
import { Navigate, WImage } from '@wsvvrijheid/ui'

export default function HashtagMiniCard({ image, title, link }) {
  return (
    <Container>
      <Card
        as={Navigate}
        href={link || '/'}
        direction={'row'}
        overflow="hidden"
        borderRadius={'xl'}
        variant="solid"
        boxShadow="lg"
        minH={'min-content'}
        _hover={{ bg: 'whiteAlpha.900' }}
      >
        <WImage w={40} h={40} src={image} />
        <Stack p={4} justifyContent={'space-between'}>
          <Heading>{title}</Heading>
          <Text>Date</Text>
        </Stack>
      </Card>
    </Container>
  )
}
