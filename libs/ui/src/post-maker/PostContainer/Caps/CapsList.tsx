import { FC, memo } from 'react'

import { Box, Stack, Text } from '@chakra-ui/react'
import { Post } from '@wsvvrijheid/types'
import { useSetCurrentPost } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'

import { CapsItem } from './CapsItem'

interface CapsListProps {
  sharedPosts: number[]
  posts?: Post[]
}

export const CapsList: FC<CapsListProps> = memo(function CapsList({
  sharedPosts,
  posts,
}) {
  const { t } = useTranslation()

  const setCurrentPost = useSetCurrentPost()

  return (
    <Box
      pos="relative"
      w={{ base: 'full', lg: 150 }}
      h={{ base: 115, lg: 'full' }}
      overflow="hidden"
    >
      <Stack
        pos="absolute"
        top={0}
        left={0}
        h="full"
        w="full"
        data-tour="step-other-posts"
        data-tour-mob="step-other-posts"
      >
        <Text color="gray.500" fontSize="sm">
          {t('post.other-posts')}
        </Text>
        <Stack
          direction={{ base: 'row', lg: 'column' }}
          h="full"
          w="full"
          overflowY={{ base: 'hidden', lg: 'auto' }}
          overflowX={{ base: 'auto', lg: 'hidden' }}
        >
          {posts?.slice(0, 15).map((post, i) => {
            return (
              <CapsItem
                key={i}
                image={post.image?.url as string}
                id={post.id}
                isShared={sharedPosts.includes(post.id)}
                onCapsClick={setCurrentPost}
              />
            )
          })}
        </Stack>
      </Stack>
    </Box>
  )
})
