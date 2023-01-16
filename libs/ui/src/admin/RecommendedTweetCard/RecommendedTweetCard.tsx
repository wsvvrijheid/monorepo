import { FC, useState } from 'react'

import { HStack, Stack, useDisclosure } from '@chakra-ui/react'
import { useRecommendTweet } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import { RecommendedTweetCreateInput } from '@wsvvrijheid/types'
import { TimelineTweet as TimelineTweetType } from '@wsvvrijheid/types'
import { FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa'

import { CreateTweetForm, SocialButtons } from '../../components'
import { TimelineLocalTweet, TimelineTweet } from '../TimelineTweet'
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

  const recomendedTweetButtons = [
    {
      label: 'Twitter',
      icon: FaTwitter,
      link: {
        en: 'https://twitter.com/sanatduragi_nl',
        tr: 'https://twitter.com/sanatduragi_nl',
        nl: 'https://twitter.com/sanatduragi_nl',
      },
    },
    {
      label: 'WhatsApp',
      icon: FaWhatsapp,
      link: {
        en: 'https://api.whatsapp.com/send?phone=31685221308',
        tr: 'https://api.whatsapp.com/send?phone=31685221308',
        nl: 'https://api.whatsapp.com/send?phone=31685221308',
      },
    },
    {
      label: 'Instagram',
      icon: FaInstagram,
      link: {
        en: 'https://instagram.com/sanatduragi.nl',
        tr: 'https://instagram.com/sanatduragi.nl',
        nl: 'https://instagram.com/sanatduragi.nl',
      },
    },
  ]
  console.log('recommender in card', tweet?.recommender)
  const onEdit = (data: TimelineLocalTweet) => {
    setEditTweet(data.tweet)
    onOpen()
  }
  return (
    <Stack
      spacing={4}
      align={'start'}
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      p={4}
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
      <SocialButtons items={recomendedTweetButtons} />
    </Stack>
  )
}
