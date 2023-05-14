import { FC } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  HStack,
  Image,
  Stack,
  Text,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
} from '@chakra-ui/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
} from 'next-share'
import { BsChat, BsThreeDotsVertical, BsTwitter } from 'react-icons/bs'
import { FaFacebook, FaLinkedin, FaTelegram, FaWhatsapp } from 'react-icons/fa'
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
  handleMentionClick: (mention: string) => void
  handleTrendClick: (trend: string) => void
  addMention: () => void
  addTrend: () => void
  showStats: () => void
  borderTop?: string
}

export const PostMakerTweetCard: FC<PostMakerTweetCardProps> = ({
  content,
  mentions,
  trends,
  image,
  handleMentionClick,
  handleTrendClick,
  addMention,
  addTrend,
  showStats,
  borderTop,
}) => {
  const { twitterContent } = makeSocialContent(content)

  const {
    asPath,
    locale,
    query: { slug },
  } = useRouter()

  const URL = `${SITE_URL}${asPath}`

  const baseUrl = 'https://twitter.com/intent/tweet'
  const params = {
    url: `${SITE_URL}/${locale}/hashtags/${slug}/`,
    text: `${twitterContent}\n\n`,
  }
  const query = new URLSearchParams(params)
  const result = query.toString()

  const postUrl = `${baseUrl}?${result.toString()}`

  return (
    <Stack border={'1px solid gray'} p={1} borderTop={borderTop}>
      <Text>{content}</Text>
      <ButtonGroup>
        {mentions.map(mention => (
          <Button
            border={'1px solid orange'}
            color={'orange'}
            variant={'link'}
            rounded={'lg'}
            px={2}
            onClick={() => handleMentionClick(mention)}
          >
            <GoMention />
            {mention}
          </Button>
        ))}
      </ButtonGroup>
      <ButtonGroup>
        {trends.map(trend => (
          <Button
            border={'1px solid gray'}
            color={'gray'}
            variant={'link'}
            rounded={'lg'}
            px={2}
            onClick={() => handleTrendClick(trend)}
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
        <Button
          color={'orange'}
          variant={'ghost'}
          colorScheme={'orange'}
          onClick={() => addMention()}
        >
          <GoMention />
          <Text display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}>
            Add Mention
          </Text>
        </Button>
        <Button
          color={'orange'}
          variant={'ghost'}
          colorScheme={'orange'}
          onClick={() => addTrend()}
        >
          <MdTrendingUp />
          <Text display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}>
            Add Trend
          </Text>
        </Button>
        <Button
          color={'orange'}
          variant={'ghost'}
          colorScheme={'orange'}
          onClick={() => showStats()}
        >
          <TbCircleDashed />
        </Button>

        <Link href={postUrl} target={'_blank'}>
          <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
            <BsTwitter />
            <Text
              display={{ base: 'none', sm: 'none', md: 'flex', lg: 'flex' }}
            >
              Tweet
            </Text>
          </Button>
        </Link>

        <Popover>
          <PopoverTrigger>
            <Button color={'orange'} variant={'ghost'} colorScheme={'orange'}>
              <BsThreeDotsVertical />
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverBody display={'flex'} justifyContent={'space-evenly'}>
              <IconButton
                as="span"
                isRound
                bg="none"
                border={'1px solid orange'}
                color="orange"
                _hover={{
                  bg: 'facebook.500',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label="share on whatsapp"
                icon={<BsChat />}
              />
              <FacebookShareButton quote={content} url={URL}>
                <IconButton
                  as="span"
                  isRound
                  bg="none"
                  border={'1px solid orange'}
                  color="orange"
                  _hover={{
                    bg: 'facebook.500',
                    color: 'white',
                    border: 'none',
                  }}
                  aria-label="share on whatsapp"
                  icon={<FaFacebook />}
                />
              </FacebookShareButton>

              <WhatsappShareButton title={content} url={URL}>
                <IconButton
                  as="span"
                  isRound
                  bg="none"
                  border={'1px solid orange'}
                  color="orange"
                  _hover={{
                    bg: 'whatsapp.500',
                    color: 'white',
                    border: 'none',
                  }}
                  aria-label="share on whatsapp"
                  icon={<FaWhatsapp />}
                />
              </WhatsappShareButton>
              <TelegramShareButton url={URL} title={content}>
                <IconButton
                  as="span"
                  isRound
                  bg="none"
                  border={'1px solid orange'}
                  color="orange"
                  _hover={{
                    bg: 'telegram.500',
                    color: 'white',
                    border: 'none',
                  }}
                  aria-label="share on telegram"
                  icon={<FaTelegram />}
                />
              </TelegramShareButton>
              <LinkedinShareButton url={URL} title={content} about={content}>
                <IconButton
                  as="span"
                  isRound
                  bg="none"
                  border={'1px solid orange'}
                  color="orange"
                  _hover={{
                    bg: 'linkedin.500',
                    color: 'white',
                    border: 'none',
                  }}
                  aria-label="share on linkedin"
                  icon={<FaLinkedin />}
                />
              </LinkedinShareButton>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
    </Stack>
  )
}
