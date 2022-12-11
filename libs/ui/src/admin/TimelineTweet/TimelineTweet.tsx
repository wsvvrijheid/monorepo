import { FC } from 'react'

import {
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
} from '@chakra-ui/react'
import { BsBookmarkPlus, BsThreeDots } from 'react-icons/bs'
import { RiEditLine } from 'react-icons/ri'
import twitterText from 'twitter-text'

import { WImage } from '../../components'
import { TimelineTweetProps } from './types'

export const TimelineTweet: FC<TimelineTweetProps> = ({
  tweet,
  onEdit,
  onSave,
  user,
  ...rest
}) => {
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
      <Avatar name={user.username} src={user.profile} mr={1} />

      <Stack spacing={4}>
        {/* Tweet Header */}
        <HStack justify={'space-between'}>
          <Box lineHeight={1.15}>
            <Text noOfLines={1} wordBreak={'break-all'} fontWeight={'bolder'}>
              {user.name}
            </Text>
            <Text noOfLines={1} color={'gray.500'}>
              @{user.username}
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
                <MenuItem
                  icon={<RiEditLine />}
                  onClick={() => onEdit({ tweet, user })}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  icon={<BsBookmarkPlus />}
                  onClick={() => onSave({ tweet, user })}
                >
                  Save (Bookmark)
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </HStack>
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
        {tweet?.media?.url && (
          <Box mt={2}>
            <WImage
              ratio="twitter"
              src={tweet?.media?.url}
              rounded={'lg'}
              alt={tweet.text}
            />
          </Box>
        )}
      </Stack>
    </HStack>
  )
}
