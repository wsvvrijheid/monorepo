import { FC, useState } from 'react'

import {
  HStack,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { RecommendedTweetCreateInput } from '@wsvvrijheid/types'
import { TimelineTweet as TimelineTweetType } from '@wsvvrijheid/types'

import { CreateTweetForm } from '../../components'
import { TimelineLocalTweet, TimelineTweet } from '../TimelineTweet'
import { RecommendedSocialButtons } from './RecommendedSocialButtons'
import { RecommendedTweetCardProps } from './types'

export const RecommendedTweetCard: FC<RecommendedTweetCardProps> = ({
  tweet,
  key,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [editTweet, setEditTweet] = useState<TimelineTweetType>()

  const { user } = useAuthSelector()
  const { mutateAsync } = useRecommendTweet()

  const handleSubmit = async (
    text: string,
    originalTweet: TimelineTweetType,
    mentions: number[],
    media?: File,
  ) => {
    const recommendedTweet: RecommendedTweetCreateInput = {
      recommender: Number(user?.id),
      originalTweet: JSON.parse(JSON.stringify(originalTweet)),
      media,
      text,
      mentions,
    }

    await mutateAsync(recommendedTweet)
    onClose()
  }
  const isVertical = useBreakpointValue({
    base: true,
    lg: false,
  })

  // const recomendedTweetButtons = [
  //   {
  //     label: 'Twitter',
  //     icon: FaTwitter,
  //     link: {
  //       en: 'https://twitter.com/sanatduragi_nl',
  //       tr: 'https://twitter.com/sanatduragi_nl',
  //       nl: 'https://twitter.com/sanatduragi_nl',
  //     },
  //   },
  //   {
  //     label: 'WhatsApp',
  //     icon: FaWhatsapp,
  //     link: {
  //       en: 'https://api.whatsapp.com/send?phone=31685221308',
  //       tr: 'https://api.whatsapp.com/send?phone=31685221308',
  //       nl: 'https://api.whatsapp.com/send?phone=31685221308',
  //     },
  //   },
  //   {
  //     label: 'Instagram',
  //     icon: FaInstagram,
  //     link: {
  //       en: 'https://instagram.com/sanatduragi.nl',
  //       tr: 'https://instagram.com/sanatduragi.nl',
  //       nl: 'https://instagram.com/sanatduragi.nl',
  //     },
  //   },
  // ]
  console.log('recommender in card', tweet)
  const onEdit = (data: TimelineLocalTweet) => {
    setEditTweet(data.tweet)
    onOpen()
  }
  return (
    <Stack
      spacing={4}
      // align={'start'}
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      p={4}
      align={'space-between'}
      overflow="hidden"
    >
      {editTweet && (
        <CreateTweetForm
          onSubmit={handleSubmit}
          isOpen={isOpen}
          onClose={onClose}
          originalTweet={editTweet}
          isNews={false}
        />
      )}

      <HStack spacing={4} align={'start'} bg={'white'} rounded={'md'} p={4}>
        <TimelineTweet
          tweet={tweet}
          user={tweet?.recommender}
          onEdit={onEdit}
          key={key}
        />
      </HStack>
      <RecommendedSocialButtons
        tweet={tweet}
        isVertical={isVertical}
        //items={recomendedTweetButtons}
      />
    </Stack>
  )
}
