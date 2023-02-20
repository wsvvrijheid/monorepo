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
      transitionDuration={'300ms'}
      _hover={{
        lg: {
          bgGradient: 'linear(to-r, blackAlpha.50, white)',
          transform: 'translateX(4px)',
        },
      }}
    >
      <WImage ratio={1 / 1} w={'3xs'} borderRadius={'xl'} src={hashtag.image} />
      <Stack p={{ base: 1, lg: 5 }} justifyContent={'flex-start'}>
        <Heading as={'h4'} size={{ base: 'md', sm: 'lg' }}>
          {hashtag.title}
        </Heading>
        <Text>{hashtag.description.substring(0, 45).concat('...')}</Text>
      </Stack>
    </Card>
  )
}
