import { FC, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Stack,
  Text,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { TwitterShareButton } from 'next-share'
import { BsThreeDotsVertical, BsTwitter } from 'react-icons/bs'
import { GoMention } from 'react-icons/go'
import { MdTrendingUp } from 'react-icons/md'
import { RiHashtag } from 'react-icons/ri'
import { TbCircleDashed } from 'react-icons/tb'

import { SITE_URL } from '@wsvvrijheid/config'
import { makeSocialContent } from '@wsvvrijheid/utils'

export type PostMakerTweetCardProps = {
  content: string
  mentions: string[]
  trends: string[]
  image?: string
}

export const PostMakerTweetCard: FC<PostMakerTweetCardProps> = ({
  content,
  mentions,
  trends,
  image,
}) => {
  const [related, setRelated] = useState<string[]>(mentions)
  const [hashtags, setHashtags] = useState<string[]>(trends)
  const { twitterContent } = makeSocialContent(content)
  const twitterContentWithMentions = related.length
    ? twitterContent + ' @' + related.join(' @')
    : twitterContent
  const { asPath } = useRouter()

  const URL = `${SITE_URL}${asPath}`

  const handleMention = (m: string) => {
    const filteredMention = related.filter(mention => mention !== m)

    setRelated(filteredMention)
  }
  const handleTrend = (t: string) => {
    const filteredTrend = hashtags.filter(trend => trend !== t)

    setHashtags(filteredTrend)
  }

  return (
    <Stack border={'1px solid orange'} p={1}>
      <Text>{content}</Text>
      <ButtonGroup>
        {related.map(mention => (
          <Button
            border={'1px solid orange'}
            color={'orange'}
            variant={'link'}
            rounded={'lg'}
            px={2}
            onClick={() => handleMention(mention)}
          >
            <GoMention />
            {mention}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {hashtags.map(trend => (
          <Button
            border={'1px solid gray'}
            color={'gray'}
            variant={'link'}
            rounded={'lg'}
            px={2}
            onClick={() => handleTrend(trend)}
          >
            <RiHashtag />
            {trend}
          </Button>
        ))}
      </ButtonGroup>
      <Box>
        <Image src={image} alt={''} rounded="md" />
      </Box>
      <HStack justifyContent={'space-evenly'}>
        <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
          <GoMention />
          <Text display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}>
            Add Mention
          </Text>
        </Button>
        <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
          <MdTrendingUp />
          <Text display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}>
            Add Trend
          </Text>
        </Button>
        <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
          <TbCircleDashed />
        </Button>

        <TwitterShareButton
          title={twitterContentWithMentions}
          url={URL}
          related={related}
          hashtags={hashtags}
        >
          <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
            <BsTwitter />
            <Text
              display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
            >
              Tweet
            </Text>
          </Button>
        </TwitterShareButton>
        <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
          <BsThreeDotsVertical />
        </Button>
      </HStack>
    </Stack>
  )
}
