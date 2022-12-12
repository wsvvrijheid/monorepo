import { FC } from 'react'

import {
  HStack,
  Popover,
  PopoverTrigger,
  Avatar,
  ButtonGroup,
  Tooltip,
  IconButton,
  PopoverContent,
  VStack,
  Divider,
  Box,
  Text,
} from '@chakra-ui/react'
import { formatNumber } from '@wsvvrijheid/utils'
import { FaTimes } from 'react-icons/fa'

import { MentionItemProps } from './types'

export const MentionItem: FC<MentionItemProps> = ({
  mention,
  onRemoveItem,
}) => {
  const data = mention?.data
  const id = mention?.id

  const handleRemove = () => {
    onRemoveItem(id)
  }
  return (
    <HStack spacing={3} w={'full'}>
      {/* pop over content*/}
      <Popover trigger="hover" placement="right">
        <PopoverTrigger>
          <HStack
            px={4}
            py={2}
            w="full"
            cursor="pointer"
            transition="padding 0.3s"
            rounded={'md'}
            _hover={{
              shadow: 'base',
            }}
          >
            <HStack flex="1" fontSize="sm">
              <Avatar
                name={data?.screen_name}
                src={data?.profile_image_url_https}
                size="sm"
                pos="static"
              />
              <Box>
                <Text noOfLines={1}>{data?.name}</Text>
                <Text>@{data?.screen_name}</Text>
              </Box>
            </HStack>
            <ButtonGroup>
              {/* onRemoveItem && */}
              {
                <Tooltip label={'remove mention'}>
                  <IconButton
                    pos="static"
                    aria-label={'remove mention'}
                    variant="ghost"
                    onClick={handleRemove}
                    colorScheme="blackAlpha"
                    _hover={{ color: 'red.400' }}
                    rounded="full"
                    size="sm"
                    icon={<FaTimes />}
                  />
                </Tooltip>
              }
            </ButtonGroup>
          </HStack>
        </PopoverTrigger>
        <PopoverContent
          overflow="hidden"
          bg="white"
          color="black"
          minW={200}
          rounded="lg"
          py={2}
          textAlign="center"
        >
          <VStack w="full" fontSize="sm">
            <Avatar
              name={data?.screen_name}
              size="lg"
              src={data?.profile_image_url_https}
              shadow="base"
            />
            <Box fontWeight="semibold">
              <Text fontSize="xl">{data?.name}</Text>
              <Text color="twitter.400">@{data?.screen_name}</Text>
            </Box>

            <Text px={4}>{data?.description}</Text>

            <Divider />

            <HStack w="full" justify="space-evenly">
              <Box>
                <Text>Following</Text>
                <Text>{formatNumber(data?.friends_count)}</Text>
              </Box>
              <Box>
                <Text>Followers</Text>
                <Text>{formatNumber(data?.followers_count)}</Text>
              </Box>
            </HStack>
          </VStack>
        </PopoverContent>
      </Popover>
    </HStack>
  )
}
