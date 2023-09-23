import { FC } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  IconButton,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { AiFillHeart } from 'react-icons/ai'
import { FaCalendarDay, FaClock, FaEye } from 'react-icons/fa'

import { Blog, UploadFile } from '@wsvvrijheid/types'
import { getReadingTime } from '@wsvvrijheid/utils'

import { BlogCard } from '../BlogCard'
import { FormattedDate } from '../FormattedDate'
import { Markdown } from '../Markdown'
import { ShareButtons } from '../ShareButtons'
import { WImage } from '../WImage'

export type BlogDetailProps = {
  post: Blog
  isLiked?: boolean
  toggleLike: () => void
  link: string
  source: MDXRemoteSerializeResult
  authorBlogs: Blog[]
}

export const BlogDetail: FC<BlogDetailProps> = ({
  post,
  isLiked,
  toggleLike,
  link,
  source,
  authorBlogs,
}) => {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const readingTime = getReadingTime(post.content || '', locale)

  return (
    <Stack py={8} spacing={8}>
      <WImage ratio="twitter" rounded="lg" src={post.image as UploadFile} />
      <Heading as="h1" textAlign="center">
        {post?.title}
      </Heading>
      <Wrap
        fontSize="md"
        justify={{ base: 'center', md: 'space-between' }}
        color="gray.500"
        spacing={4}
      >
        <Wrap spacing={4} justify="center">
          <Box>
            <HStack>
              <Icon as={FaCalendarDay} />
              <FormattedDate date={post.publishedAt as string} />
            </HStack>
            <HStack>
              <Icon as={FaClock} />
              <Text>{readingTime}</Text>
            </HStack>
          </Box>
          <Box>
            <HStack>
              <Box as={FaEye} />
              <Text>{post?.views} views</Text>
            </HStack>
            <HStack>
              <Box as={AiFillHeart} />
              <Text>
                {(post?.likes || 0) + (post?.likers?.length || 0)} likes
              </Text>
            </HStack>
          </Box>
        </Wrap>

        <ShareButtons
          title={post?.title}
          url={link}
          quote={post?.description as string}
        >
          <IconButton
            rounded="full"
            aria-label="like post"
            color={isLiked ? 'red.400' : 'gray.400'}
            icon={<AiFillHeart />}
            onClick={toggleLike}
          />
        </ShareButtons>
      </Wrap>
      <Box textAlign={{ base: 'left', lg: 'justify' }}>
        <Markdown source={source} />
        <Text>
          <>
            {t('author')}: {post?.author?.name || post?.author?.username}
          </>
        </Text>
      </Box>
      <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2 }}>
        {authorBlogs.map((blog, idx) => (
          <BlogCard key={idx} post={blog} isFeatured={true} />
        ))}
      </SimpleGrid>
    </Stack>
  )
}
