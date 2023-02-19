import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Navigate, WImage } from '@wsvvrijheid/ui'
import { useTranslation } from 'react-i18next'

import { HashtagMiniCard } from './HashtagMiniCard'
import { SearchedHashtags } from '../../pages/index'

type HashtagsSummaryProps = {
  hashtags: SearchedHashtags
  links: string[]
}

export const HashtagsSummary: FC<HashtagsSummaryProps> = ({
  hashtags,
  links,
}) => {
  const { t } = useTranslation()

  const latestHashtag = hashtags.data[0]
  const latestLink = links[0]

  return (
    <Box bg={'white'} p={{ base: 2, lg: 20 }}>
      <Stack
        direction={{ base: 'column-reverse', lg: 'row' }}
        spacing={{ base: 6, lg: 4 }}
        justifyContent={'space-between'}
        px={30}
        py={10}
        borderRadius={'xl'}
        border={2}
        borderColor={'white'}
      >
        <Stack
          direction={'column'}
          alignItems={'stretch'}
          justifyContent={'center'}
          spacing={4}
        >
          {hashtags.data.map((hashtag, i) => {
            if (i !== 0) {
              return (
                <HashtagMiniCard
                  key={hashtag.id}
                  hashtag={hashtag}
                  link={links[i]}
                />
              )
            }
          })}
        </Stack>
        <Stack
          direction={'column'}
          color="white"
          spacing={{ base: 2, lg: 8 }}
          alignItems={'stretch'}
          justifyContent={'space-between'}
        >
          <WImage
            ratio={16 / 10}
            borderRadius={'xl'}
            border={'1px'}
            borderColor={'white'}
            src={latestHashtag.image}
          />
          <Stack
            spacing={{ base: 2, lg: 4 }}
            alignItems={'flex-start'}
            color={'black'}
          >
            <Heading as="h3" size="lg">
              {latestHashtag.title}
            </Heading>
            <Text size="lg" fontWeight="normal">
              {latestHashtag.description}
            </Text>
            <Button
              as={Navigate}
              href={latestLink || '/'}
              size={'lg'}
              fontWeight="semibold"
              variant="solid"
              colorScheme="primary"
              boxShadow="lg"
              whiteSpace="normal"
              _hover={{ bg: 'primary.300' }}
            >
              {t('read-more')}
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  )
}
