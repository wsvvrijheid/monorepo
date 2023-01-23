import { FC } from 'react'

import { Box, Button, Grid, Heading, Stack, Text } from '@chakra-ui/react'
import { ROUTES } from '@wsvvrijheid/config'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { Navigate, WImage } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowRight } from 'react-icons/fa'

interface SliderHeroProps {
  item: Hashtag
  type: keyof typeof ROUTES | 'post'
}

export const HashtagCard: FC<SliderHeroProps> = ({ item, type }) => {
  const { locale } = useRouter()
  const { t } = useTranslation(['common'])
  const link = getItemLink(item, locale as StrapiLocale, type)

  return (
    <Grid
      gap={8}
      gridTemplateColumns={{ base: '1fr', lg: '4fr 3fr' }}
      alignItems="center"
    >
      <Stack
        align="start"
        flex={1}
        spacing={8}
        p={{ base: 4, lg: 8 }}
        order={{ base: 2, lg: 1 }}
      >
        <Box>
          <Heading size="lg">{item.title}</Heading>
          {(item as Hashtag).hashtagDefault && (
            <Heading size="md" color="gray.900">
              {(item as Hashtag).hashtagDefault}
            </Heading>
          )}
          {(item as Hashtag).hashtagExtra && (
            <Heading size="md" color="gray.900">
              {(item as Hashtag).hashtagExtra}
            </Heading>
          )}
        </Box>
        <Text>{item.date}</Text>
        <Box>
          <Text flex={1} noOfLines={4}>
            {item.description}
          </Text>
        </Box>

        <Button
          as={Navigate}
          href={link as string}
          justifySelf="end"
          colorScheme="primary"
          rightIcon={<FaArrowRight />}
        >
          {t('read-more')}
        </Button>
      </Stack>

      <Box flex={1} h="full" w="full">
        <WImage overflow="hidden" src={item.image} />
      </Box>
    </Grid>
  )
}
