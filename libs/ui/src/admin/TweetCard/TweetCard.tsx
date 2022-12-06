import { FC } from 'react'

import {
  AspectRatio,
  Avatar,
  Box,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useBoolean,
} from '@chakra-ui/react'
import { getTwitterVideoUrl } from '@wsvvrijheid/utils'
import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { FaPlayCircle } from 'react-icons/fa'
import { RiEditLine } from 'react-icons/ri'
import ReactPlayer from 'react-player'
import twitterText from 'twitter-text'

import { WImage } from '../../components'
import { TweetCardProps } from './types'

export const TweetCard: FC<TweetCardProps> = ({
  tweet,
  onEdit,
  onSave,
  ...rest
}) => {
  const [playing, setPlaying] = useBoolean()

  return (
    <HStack
      spacing={4}
      align={'start'}
      bg={'white'}
      rounded={'md'}
      shadow={'sm'}
      p={4}
      {...rest}
    >
      <Avatar name={tweet.user.name} src={tweet.user.profile} />

      <Stack spacing={4}>
        {/* Tweet Header */}
        <HStack justify={'space-between'} title={tweet.user.username}>
          <Box lineHeight={1.15}>
            <Text noOfLines={1} wordBreak={'break-all'} fontWeight={'bolder'}>
              {tweet.user.name}
            </Text>
            <Text noOfLines={1} color={'gray.500'}>
              @{tweet.user.username}
            </Text>
          </Box>

          {onEdit && onSave && (
            <Menu>
              <MenuButton
                size="sm"
                rounded="full"
                as={IconButton}
                icon={<BsThreeDots />}
                variant="ghost"
              />
              <MenuList>
                <MenuItem icon={<RiEditLine />} onClick={() => onEdit(tweet)}>
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<BsBookmarkPlus />}
                  onClick={() => onSave(tweet)}
                >
                  Save (Bookmark)
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>

        {/* Tweet Content */}
        <Text
          ml={2}
          wordBreak={'break-word'}
          whiteSpace={'pre-wrap'}
          sx={{
            '& a': {
              color: 'twitter.500',
            },
          }}
          dangerouslySetInnerHTML={{ __html: twitterText.autoLink(tweet.text) }}
        />

        {/* Video */}
        {tweet.videos && (
          <AspectRatio
            ratio={16 / 9}
            w="full"
            rounded={'lg'}
            overflow="hidden"
            onClick={setPlaying.toggle}
          >
            <ReactPlayer
              playing={playing}
              url={getTwitterVideoUrl(tweet.videos)}
              width="100%"
              height="100%"
              light={tweet.image}
              playIcon={
                <Box boxSize={12} color="whiteAlpha.700" as={FaPlayCircle} />
              }
            />
          </AspectRatio>
        )}
        {/* Image */}
        {!tweet.videos && tweet.image && (
          <WImage
            ratio="twitter"
            src={tweet.image}
            rounded={'lg'}
            alt={tweet.text}
          />
        )}
      </Stack>
    </HStack>
  )
}
