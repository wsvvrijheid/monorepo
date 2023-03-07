import { Link, Stack, Text, VStack } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import {
  Caps,
  ShareButtons,
  useItemLink,
  useLocaleTimeFormat,
} from '@wsvvrijheid/ui'
import { formatInTimeZone } from 'date-fns-tz'
import { useTranslation } from 'next-i18next'
//import { GrAnnounce } from 'react-icons/gr'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement = ({
  hashtag,
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
  const linkCaps = useItemLink(hashtag, 'hashtag')

  console.log('useItemlink', linkCaps)
  return (
    <Stack spacing={4} mb={8} mt={8} ml={8}>
      {/* <Center>
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
      </Center> */}
      <Caps
        imageParams={{
          title: `📢${t('announcement.title')}📢`,
          text: `${t('announcement.topic')} ${hashtag?.description}\n\n${t(
            'announcement.date',
          )} ${formattedDate}\n\n 🇳🇱 ${formatedHour} \n 🇹🇷  ${turkeyHour} \n\n`,
          image:
            'https://www.simplilearn.com/ice9/free_resources_article_thumb/COVER-IMAGE_Digital-Selling-Foundation-Program.jpg',
          shape: 0,
          bg: 'white',
          color: 'black',
          flip: true,
          hasLine: true,
          scale: 0.5,
        }}
      />
      <VStack alignItems={'start'} p={4}>
        <Text>{hashtag?.content}</Text>
        <Link href={link}>
          <Text fontWeight={'bold'} color={'primary'} m={4}>
            {t('join-link')}
          </Text>
        </Link>
        <ShareButtons
          title={`📢${t('announcement.title')}📢`}
          url={`${API_URL}${linkCaps}`}
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
