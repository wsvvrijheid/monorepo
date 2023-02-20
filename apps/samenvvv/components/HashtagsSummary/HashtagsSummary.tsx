import { FC } from 'react'

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Navigate, WImage } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import { HashtagMiniCard } from './HashtagMiniCard'

type HashtagsSummaryProps = {
  hashtags: Hashtag[]
}

export const HashtagsSummary: FC<HashtagsSummaryProps> = ({ hashtags }) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const links = hashtags.map(hashtag => {
    return getItemLink(hashtag, locale as StrapiLocale, 'hashtag')
  })

  const latestHashtag = hashtags[0]
  const latestLink = links[0]

  return (
    <Box bg={'white'} p={{ base: 4, lg: 16 }}>
      <Stack
        direction={{ base: 'column-reverse', lg: 'row' }}
        spacing={{ base: 6, lg: 4 }}
        justifyContent={'space-between'}
        borderRadius={'xl'}
        border={2}
        borderColor={'white'}
        maxH={{ lg: '2xl' }}
      >
        <Stack
          direction={'column'}
          alignItems={'stretch'}
          justifyContent={'space-evenly'}
          spacing={{ base: 3, lg: 6 }}
          maxW={'lg'}
        >
          {hashtags.map((hashtag, i) => {
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
          flexGrow={1}
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
            px={1}
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
