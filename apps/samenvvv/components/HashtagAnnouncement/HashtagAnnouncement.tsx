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
import { addHours, format } from 'date-fns'
import { GrAnnounce } from 'react-icons/gr'

import { HashtagAnnouncementProps } from './types'

export const HashtagAnnouncement = ({
  title,
  description,
  date,
  defaultCaps,
  hashtag,
  content,
  join,
  link,
}: HashtagAnnouncementProps) => {
  const { formattedDate } = useLocaleTimeFormat(date?.value, 'dd MMMM yyyy')
  const { formattedDate: formatedHour } = useLocaleTimeFormat(
    date?.value,
    'HH:mm',
  )
  const TurkeyHour = format(
    addHours(new Date(date?.value as string), 2),
    'HH:mm',
  )
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
            <Text>{title}</Text>
          </Button>
        </HStack>
      </Center>
      <VStack alignItems={'start'} p={4}>
        <HStack>
          <Text fontWeight={'bold'}>{description?.name}</Text>
          <Text> {description?.value}</Text>
        </HStack>

        <HStack>
          <VStack alignItems={'start'}>
            <HStack>
              <Text fontWeight={'bold'}>{date?.name} </Text>
              <Text>{formattedDate}</Text>
            </HStack>
            <VStack p={4}>
              <Text>🇳🇱 {formatedHour}</Text>
              <Text>🇹🇷 {TurkeyHour}</Text>
            </VStack>
          </VStack>
        </HStack>
        <HStack>
          <Text fontWeight={'bold'}>{hashtag?.name} </Text>
          <Text>{hashtag?.value}</Text>
        </HStack>

        <Text>{content}</Text>
        <Link href={link}>
          <Text fontWeight={'bold'} color={'primary'} m={4}>
            {join}
          </Text>
        </Link>
        <ShareButtons
          //  title={`📢${hashtagAnounscements.title}`}
          url={defaultCaps?.url}
          //TODO create caps for announcement
          quote={
            `📢${title}📢 \n\n ${description?.name} ${description?.value}\n\n${date?.name} ${formattedDate}\n\n 🇳🇱 ${formatedHour} \n 🇹🇷  ${TurkeyHour} \n\n${content} \n` ||
            ''
          }
        />
      </VStack>
    </Stack>
  )
}
