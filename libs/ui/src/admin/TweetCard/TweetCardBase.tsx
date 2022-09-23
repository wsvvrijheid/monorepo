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

import { WImage } from '../../components'
import { TweetBaseCardProps } from './types'

export const TweetCardBase: FC<TweetBaseCardProps> = ({
  tweet,
  onEdit,
  onSave,
  ...rest
}) => {
  const [playing, setPlaying] = useBoolean()

  return (
    <HStack align="start" bg={'white'} rounded="lg" p={4} {...rest}>
      <Avatar name={tweet.user.name} src={tweet.user.profile} />

      <Stack>
        {/* Tweet Header */}
        <HStack justify={'space-between'} title={tweet.user.username}>
          <HStack noOfLines={1}>
            <Text fontSize={'sm'} fontWeight={'bolder'}>
              {tweet.user.name}
            </Text>
            <Text fontSize={'xs'} color={'gray'}>
              @{tweet.user.username}
            </Text>
          </HStack>

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
        <Text fontSize={'sm'} ml={2}>
          {tweet.text}
        </Text>

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
