import { FC } from 'react'

import { Flex, IconButton, Stack, Text, VStack } from '@chakra-ui/react'
import { Post } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { FaRandom } from 'react-icons/fa'

import { useGenerateRandomPostText } from '../../hooks'
import { CapsList } from './Caps'
import { PostCharCount } from './PostCharCount'
import { PostContainerBody } from './PostContainerBody'
import { PostContainerButtons } from './PostContainerButtons'

interface PostContainerProps {
  sharedPosts: number[]
  post?: Post
  posts?: Post[]
}

export const PostContainer: FC<PostContainerProps> = ({
  sharedPosts,
  posts,
  post,
}) => {
  const { t } = useTranslation()

  const generateRandomPostText = useGenerateRandomPostText()

  return (
    <Stack
      p={4}
      shadow="base"
      bg="orange.50"
      align="stretch"
      spacing={4}
      flex={1}
      direction={{ base: 'column', lg: 'row' }}
    >
      <VStack align="stretch" flex="1">
        <Flex justify="space-between">
          <Text color="gray.500" fontSize="sm">
            {t('post.content-label')}
          </Text>
          <PostCharCount />
        </Flex>
        <Stack
          spacing={0}
          overflow="auto"
          pos="relative"
          h={{ base: 'auto', xl: 520 }}
        >
          <IconButton
            pos="absolute"
            top={1}
            right={1}
            rounded="full"
            colorScheme="twitter"
            aria-label="random post"
            icon={<FaRandom />}
            onClick={() => generateRandomPostText(post)}
          />
          <PostContainerBody postImage={post?.image?.url} />
        </Stack>
        <PostContainerButtons />
      </VStack>
      <CapsList sharedPosts={sharedPosts} posts={posts} />
    </Stack>
  )
}
