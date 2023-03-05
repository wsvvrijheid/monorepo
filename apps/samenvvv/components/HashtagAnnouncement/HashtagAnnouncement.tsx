import {
  Button,
  Center,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { ShareButtons, useLocaleTimeFormat } from '@wsvvrijheid/ui'
import { formatInTimeZone } from 'date-fns-tz'
import { useTranslation } from 'next-i18next'
import { GrAnnounce } from 'react-icons/gr'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement = ({
  hashtag,
  defaultCaps,
  link,
}: HashtagAnnouncementProps) => {
  const { t } = useTranslation()
  const { formattedDate } = useLocaleTimeFormat(hashtag?.date, 'dd MMMM yyyy')
  const { formattedDate: formatedHour } = useLocaleTimeFormat(
    hashtag?.date,
    'HH:mm',
  )

  const newDate = new Date(hashtag?.date as string)

  const turkeyHour = hashtag?.date
    ? formatInTimeZone(newDate, 'Europe/Istanbul', 'HH:mm')
    : undefined

  return (
    <Stack spacing={4} mb={8} mt={8} ml={8}>
      <Center>
        <HStack alignItems="center">
          <Button
            colorScheme={'primary'}
            aria-label="create"
            leftIcon={<GrAnnounce />}
            rightIcon={<GrAnnounce />}
          >
            <Text>{t('announcement.title')}</Text>
          </Button>
        </HStack>
      </Center>
      <VStack alignItems={'start'} p={4}>
        <HStack>
          <Text fontWeight={'bold'}>{t('announcement.topic')}</Text>
          <Text> {hashtag?.description}</Text>
        </HStack>

        <HStack>
          <VStack alignItems={'start'}>
            <HStack>
              <Text fontWeight={'bold'}>{t('announcement.date')}</Text>
              <Text>{formattedDate}</Text>
            </HStack>
            <VStack p={4}>
              <Text>🇳🇱 {formatedHour}</Text>
              <Text>🇹🇷 {turkeyHour}</Text>
            </VStack>
          </VStack>
        </HStack>
        <Text>{hashtag?.content}</Text>
        <Link href={link}>
          <Text fontWeight={'bold'} color={'primary'} m={4}>
            {t('join-link')}
          </Text>
        </Link>
        <ShareButtons
          title={`📢${t('announcement.title')}📢`}
          url={defaultCaps?.url}
          //TODO create caps for announcement
          quote={
            `${t('announcement.topic')} ${hashtag?.description}\n\n${t(
              'announcement.date',
            )} ${formattedDate}\n\n 🇳🇱 ${formatedHour} \n 🇹🇷  ${turkeyHour} \n\n${
              hashtag?.content
            } \n` || ''
          }
        />
      </VStack>
    </Stack>
  )
}
