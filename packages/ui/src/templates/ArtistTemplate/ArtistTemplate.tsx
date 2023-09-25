import { FC } from 'react'

import { SimpleGrid, Stack, Text } from '@chakra-ui/react'

import { Art, Profile } from '@wsvvrijheid/types'

import { ArtCard, Container, Hero, WAvatar } from '../../components'

type ArtistTemplateProps = {
  artist: Profile
  arts: Art[]
}

export const ArtistTemplate: FC<ArtistTemplateProps> = ({ artist, arts }) => {
  return (
    <>
      <Hero>
        <Stack align="center" cursor="default" userSelect="none">
          <WAvatar
            size="lg"
            src={artist.avatar}
            name={artist?.name || artist?.username}
          />

          <Text color={'white'}>{artist?.name || artist?.username}</Text>
        </Stack>
      </Hero>
      <Container mt={'80px'}>
        <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
          {arts?.map(art => <ArtCard key={art.id} art={art} />)}
        </SimpleGrid>
      </Container>
    </>
  )
}
