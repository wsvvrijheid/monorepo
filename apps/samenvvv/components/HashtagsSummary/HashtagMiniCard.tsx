import { FC } from 'react'

import { Card, Heading, Stack, Text } from '@chakra-ui/react'
import { Hashtag } from '@wsvvrijheid/types'
import { Navigate, WImage } from '@wsvvrijheid/ui'

type HashtagMiniCardProps = {
  hashtag: Hashtag
  link: string
}

export const HashtagMiniCard: FC<HashtagMiniCardProps> = ({
  hashtag,
  link,
}) => {
  return (
    <Card
      as={Navigate}
      href={link || '/'}
      direction={'row'}
      variant="solid"
      borderRadius={'xl'}
      transition={'all'}
      transitionDuration={'500ms'}
      _hover={{ bgGradient: 'linear(to-r, blackAlpha.100, white)' }}
    >
      <WImage
        ratio={1 / 1}
        maxW={'sm'}
        w={'xs'}
        borderRadius={'xl'}
        src={hashtag.image}
      />
      <Stack p={{ base: 1, lg: 5 }} justifyContent={'flex-start'}>
        <Heading as={'h4'} size={{ base: 'sm', sm: 'lg' }}>
          {hashtag.title}
        </Heading>
        <Text>{hashtag.description.substring(0, 50).concat('...')}</Text>
      </Stack>
    </Card>
  )
}
