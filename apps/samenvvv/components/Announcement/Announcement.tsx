import {
  Button,
  Center,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { FormattedDate, ShareButtons } from '@wsvvrijheid/ui'
import { GrAnnounce } from 'react-icons/gr'

import { AnnouncementProps } from './types'

export const Announcement = ({
  title,
  description,
  date,
  defaultCaps,
  hashtag,
  content,
  join,
  link,
}: AnnouncementProps) => {
  return (
    <Stack spacing={4} mb={8} mt={8} ml={8}>
      <Center>
        <HStack alignItems="center">
          <Button
            // as={Icon}
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
              <Text>
                <FormattedDate
                  date={date?.value as string}
                  format="dd MMMM yyyy"
                />
              </Text>
            </HStack>
            <VStack p={4}>
              <Text>
                🇳🇱
                <FormattedDate date={date?.value as string} format="hh:mm " />
              </Text>
              <Text>
                🇹🇷
                <FormattedDate date={date?.value as string} format="hh:mm " />
              </Text>
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
            `📢${title} \n\n ${description?.name} ${description?.value}\n\n${date?.name} ${date?.value}\n\n 🇹🇷 ${date?.value} \n 🇳🇱 ${date?.value} \n\n${content} \n` ||
            ''
          }
        />
      </VStack>
    </Stack>
  )
}
