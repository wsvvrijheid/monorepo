import { FC } from 'react'

import {
  Avatar,
  Box,
  HStack,
  IconButton,
  Image,
  Link,
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
  // console.log('tweeet TimelineTweetBase', tweet)
  // console.log('timeline cardbase', username)

  return (
    <HStack
      align="start"
      borderBottom="1px"
      borderRadius="0px"
      borderColor="gray.300"
      bg={'white'}
      p={4}
      {...rest}
    >
      <Avatar name={username} src={profileImg} mr={1} />

      <Stack>
        {/* Tweet Header */}
        <HStack justify={'space-between'} title={username}>
          <HStack>
            <Text fontSize={'15px'} fontWeight={'bolder'}>
              {username}
            </Text>
            {/* <Text fontSize={'xs'} color={'gray'}>
              @{username}
            </Text> */}
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
        <Text fontSize={'15px'} lineHeight={'20px'} ml={2}>
          {tweet.text.split('\n').map(a => {
            return (
              <>
                <p></p>
                {a.split(' ').map(b => {
                  console.log(b)
                  if (b.startsWith('@')) {
                    return (
                      <Link
                        href={`https://twitter.com/${b.slice(1, b.length)}`}
                        cursor="pointer"
                        color="blue.400"
                        target="_blank"
                      >
                        {b + ' '}
                      </Link>
                    )
                  } else if (b.startsWith('#')) {
                    return (
                      <Link
                        href={`https://twitter.com/hashtag/${b.slice(
                          1,
                          b.length,
                        )}`}
                        cursor="pointer"
                        color="blue.400"
                        target="_blank"
                      >
                        {b + ' '}
                      </Link>
                    )
                  } else if (b.startsWith('https://')) {
                    return (
                      <Link
                        href={b.slice(1, b.length)}
                        cursor="pointer"
                        color="blue.400"
                        target="_blank"
                      >
                        {b + ' '}
                      </Link>
                    )
                  }
                  return b + ' '
                })}
              </>
            )
          })}
        </Text>
        {tweet?.media?.url && (
          <Box mt={2}>
            <Image src={tweet?.media?.url} alt="" borderRadius={16} />
          </Box>
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
