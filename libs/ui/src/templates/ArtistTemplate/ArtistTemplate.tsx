import { FC } from 'react'

import { Avatar, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { User } from '@wsvvrijheid/types'

import { ArtCard, Container, Hero } from '../../components'

type ArtistTemplateProps = {
  artist: User
}

export const ArtistTemplate: FC<ArtistTemplateProps> = ({ artist }) => {
  return (
    <>
      <Hero>
        <Stack align="center" cursor="default" userSelect="none">
          <Avatar
            size="lg"
            src={`${API_URL}${artist?.avatar?.formats?.thumbnail?.url}`}
            name={artist?.name || artist?.username}
          />

          <Text color={'white'}>{artist?.name || artist?.username}</Text>
        </Stack>
      </Hero>
      <Container mt={'80px'}>
        <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
          {artist?.arts?.map(art => (
            <ArtCard key={art.id} art={art} />
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
