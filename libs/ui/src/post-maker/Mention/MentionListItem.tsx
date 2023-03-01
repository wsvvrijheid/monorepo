import { FC } from 'react'

import {
  Avatar,
  Box,
  ButtonGroup,
  Divider,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react'
import { formatNumber } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { UserV1 } from 'twitter-api-v2'

interface MentionListItemProps {
  data: UserV1
  onAddItem: (value: UserV1) => void
  onRemoveItem?: (value: UserV1) => void
}

const MentionListItem: FC<MentionListItemProps> = ({
  data,
  onAddItem,
  onRemoveItem,
}) => {
  const { t } = useTranslation()

  if (!data) return null

  return (
    <Popover trigger="hover" placement="right">
      <PopoverTrigger>
        <HStack
          px={4}
          py={2}
          cursor="pointer"
          transition="padding 0.3s"
          _hover={{
            shadow: 'base',
            pl: 6,
          }}
        >
          <HStack flex="1" fontSize="sm">
            <Avatar
              name={data.screen_name}
              src={data.profile_image_url_https}
              size="sm"
              pos="static"
            />
            <Box>
              <Text noOfLines={1} maxW="120px">
                {data.name}
              </Text>
              <Text>@{data.screen_name}</Text>
            </Box>
          </HStack>
          <ButtonGroup>
            {onRemoveItem && (
              <Tooltip label={t('post.remove')}>
                <IconButton
                  pos="static"
                  aria-label={t('post.remove') + ' mention'}
                  variant="ghost"
                  onClick={() => onRemoveItem(data)}
                  colorScheme="blackAlpha"
                  _hover={{ color: 'red.400' }}
                  rounded="full"
                  size="sm"
                  icon={<FaTimes />}
                />
              </Tooltip>
            )}
            <Tooltip label={t('post.add')}>
              <IconButton
                pos="static"
                aria-label={t('post.add') + ' mention'}
                variant="ghost"
                onClick={() => onAddItem(data)}
                colorScheme="blackAlpha"
                _hover={{ color: 'green.400' }}
                rounded="full"
                size="sm"
                icon={<FaPlus />}
              />
            </Tooltip>
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
            name={data.screen_name}
            size="lg"
            src={data.profile_image_url_https}
            shadow="base"
          />
          <Box fontWeight={600}>
            <Text fontSize="xl">{data.name}</Text>
            <Text color="twitter.400">@{data.screen_name}</Text>
          </Box>

          <Text px={4}>{data.description}</Text>

          <Divider />

          <HStack w="full" justify="space-evenly">
            <Box>
              <Text>Following</Text>
              <Text>{formatNumber(data.friends_count)}</Text>
            </Box>
            <Box>
              <Text>Followers</Text>
              <Text>{formatNumber(data.followers_count)}</Text>
            </Box>
          </HStack>
        </VStack>
      </PopoverContent>
    </Popover>
  )
}

export default MentionListItem
