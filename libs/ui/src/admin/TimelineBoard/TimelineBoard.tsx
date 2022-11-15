import { FC } from 'react'

import { Box, HStack, Text } from '@chakra-ui/react'
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { TweetCardBase } from '@wsvvrijheid/ui'

import { TimelineBoardProps } from './types'

export const TimelineBoard: FC<TimelineBoardProps> = ({ timelines }) => {
  const onEdit = () => {
    console.log('edit')
  }

  const onSave = () => {
    console.log('save')
  }

  console.log(timelines)

  return (
    <HStack
      align="start"
      bg={'white'}
      rounded="lg"
      p={4}
      overflowY="auto"
      shouldWrapChildren={true}
    >
      {timelines?.map(timeline => (
        // eslint-disable-next-line react/jsx-key
        <Box w="460px" overflowX="auto">
          <Box bg="blue.400" color="white" p={3}>
            <HStack justify={'space-between'} title={timeline.username}>
              <HStack noOfLines={1}>
                <Text fontSize={'sm'} fontWeight={'bolder'}>
                  @{timeline.username}
                </Text>
              </HStack>
            </HStack>
          </Box>
          {/* I assigned height 700 randomly. What height do you think I should assign? */}
          <Box overflowY="auto" h="700px">
            {timeline.tweets.map((tweet, key) => (
              <TweetCardBase
                tweet={tweet}
                onEdit={onEdit}
                username={timeline.username}
                profileImg={timeline.userData.profile_image_url}
                onSave={onSave}
                key={key}
              />
            ))}
          </Box>
        </Box>
      ))}
    </HStack>
  )
}
