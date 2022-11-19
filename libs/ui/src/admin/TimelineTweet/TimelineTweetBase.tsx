import { FC } from 'react'

import {
  Avatar,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'

// import { WImage } from '../../components'
import { TimelineTweetProps } from './types'

export const TimelineTweetBase: FC<TimelineTweetProps> = ({
  tweet,
  onEdit,
  onSave,
  username,
  profileImg,
  ...rest
}) => {
  console.log('tweeet TimelineTweetBase', tweet)
  // console.log('timeline cardbase', username)

  return (
    <HStack align="start" bg={'white'} rounded="lg" p={4} {...rest}>
      <Avatar name={username} src={profileImg} />

      <Stack>
        {/* Tweet Header */}
        <HStack justify={'space-between'} title={username}>
          <HStack noOfLines={1}>
            <Text fontSize={'sm'} fontWeight={'bolder'}>
              {username}
            </Text>
            <Text fontSize={'xs'} color={'gray'}>
              @{username}
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
        <Text fontSize={'sm'} ml={2}>
          {tweet.text}
        </Text>
        {tweet?.media?.url && (
          <img src={tweet?.media?.url} alt="" />
          // <WImage
          //   ratio="twitter"
          //   src={tweet?.media?.url}
          //   rounded={'lg'}
          //   alt={tweet.text}
          // />
        )}
        {/* Tweet Content */}

        {/* Video */}
        {/* {tweet.videos && (
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
        )} */}
        {/* Image */}
        {/* {!tweet.videos && tweet.image && (
          <WImage
            ratio="twitter"
            src={tweet.image}
            rounded={'lg'}
            alt={tweet.text}
          />
        )} */}
      </Stack>
    </HStack>
  )
}
