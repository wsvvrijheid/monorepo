import { FC } from 'react'

import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Stack,
  Text,
  Icon,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { FaArrowRight } from 'react-icons/fa'
import { HiOutlineCalendar } from 'react-icons/hi'

import { ROUTES } from '@wsvvrijheid/config'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import { FormattedDate, Navigate, WImage } from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
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
        <HStack>
          <Icon as={HiOutlineCalendar} mr={1} mb={1} />
          <FormattedDate date={item.date as string} />
        </HStack>
        <Box>
          <Text flex={1} noOfLines={4}>
            {item.description}
          </Text>
        </Box>

        <Button
          as={Navigate}
          href={link as string}
          justifySelf="end"
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
