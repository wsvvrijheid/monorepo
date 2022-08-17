import { FC } from 'react'

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react'
import { BsPatchCheckFill } from 'react-icons/bs'
import { FaPlayCircle } from 'react-icons/fa'
import { GoCloudDownload } from 'react-icons/go'
import { RiEditLine } from 'react-icons/ri'
import ReactPlayer from 'react-player'

import { TweetBaseCardProps } from './types'

export const TweetCardBase: FC<TweetBaseCardProps> = ({
  tweet,
  defaultLocale,
  onEdit,
  onSave,
}) => {
  return (
    <Stack bg={'white'} p={2} borderRadius={'10px'} flexDirection={'row'}>
      <HStack alignItems={'start'} mt={1}>
        <Avatar src={tweet.user.profile} />
      </HStack>
      <HStack flexDirection={'column'} w={'100%'}>
        <HStack
          alignItems={'start'}
          w={'100%'}
          justifyContent={'space-between'}
        >
          <HStack ml={3}>
            <Text fontSize={'sm'} fontWeight={'bolder'}>
              {tweet.user.name}
            </Text>
            <BsPatchCheckFill color="#1da1f2" size={'15px'} />
            <Text fontSize={'xs'} color={'gray'}>
              @{tweet.user.username}
            </Text>
          </HStack>
          <HStack>
            <Menu>
              <MenuButton
                colorScheme={'teal'}
                variant={'ghost'}
                color="gray"
                borderRadius="50%"
                width="20px"
                height="40px"
                padding="0"
                pb={2}
                _hover={{
                  bg: 'lightgray',
                  color: 'primary.400',
                }}
                as={Button}
              >
                ...
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => onEdit(tweet)}>
                  <RiEditLine /> <Text ml={3}>Edit</Text>
                </MenuItem>
                <MenuItem onClick={() => onSave(tweet)}>
                  <GoCloudDownload /> <Text ml={3}>Save (Bookmark)</Text>
                </MenuItem>
              </MenuList>
            </Menu>
          </HStack>
        </HStack>

        <HStack w={'100%'}>
          <Text fontSize={'small'} ml={2}>
            {tweet.text}
          </Text>
        </HStack>
        {tweet.videos ? (
          <AspectRatio ratio={16 / 9} w="full" rounded={'lg'} overflow="hidden">
            <ReactPlayer
              controls
              muted
              playing
              style={{ width: '100%' }}
              url={tweet.videos[0].url}
              width="100%"
              height="100%"
              light={tweet.image}
              playIcon={
                <Box boxSize={12} color="whiteAlpha.700" as={FaPlayCircle} />
              }
            />
          </AspectRatio>
        ) : (
          tweet.image && <Image src={tweet.image} rounded={'lg'} />
        )}
      </HStack>
    </Stack>
  )
}
