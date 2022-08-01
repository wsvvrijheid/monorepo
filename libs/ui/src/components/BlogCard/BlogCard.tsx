import { FC, memo } from 'react'

import {
  Box,
  Heading,
  HStack,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
  Wrap,
} from '@chakra-ui/react'
import { Blog, StrapiLocale } from '@wsvvrijheid/types'
import { getReadingTime } from '@wsvvrijheid/utils'
import { useRouter } from 'next/router'
import { FaCalendarDay, FaClock, FaEye, FaHeart } from 'react-icons/fa'

import { FormattedDate } from '../FormattedDate'
import { Navigate } from '../Navigate'
import { WImage } from '../WImage'

type BlogCardImageProps = {
  isFeatured?: boolean
  image: string
  alt: string
}

const BlogCardImage: FC<BlogCardImageProps> = memo(
  ({ isFeatured, image, alt }) => {
    return (
      <WImage
        alt={alt}
        minH={isFeatured ? 450 : 200}
        image={image}
        ratio="twitter"
      />
    )
  },
)

export type BlogCardProps = {
  post: Blog
  isFeatured?: boolean
}

export const BlogCard: FC<BlogCardProps> = ({ post, isFeatured }) => {
  const { locale } = useRouter()
  const isMobile = useBreakpointValue({ base: true, lg: false })

  const featured = isFeatured && !isMobile
  const readingTime = getReadingTime(post.content, locale as StrapiLocale)

  return (
    <Navigate
      {...(featured && { gridColumn: { lg: 'span 2' } })}
      href={`/blog/${post.slug}`}
    >
      <Box shadow="lg" pos="relative" bg="white" rounded="sm" overflow="hidden">
        {post.image?.url && (
          <BlogCardImage
            alt={post.title}
            isFeatured={featured}
            image={post.image.url}
          />
        )}
        <Stack
          rounded="sm"
          mx={{ base: 4, lg: 8 }}
          mb={{ base: 4, lg: 8 }}
          mt={-8}
          maxW={600}
          pos="relative"
          bg="white"
          px={6}
          spacing={4}
          py={featured ? 6 : 4}
          {...(featured && {
            pos: 'absolute',
            bottom: 8,
            right: 0,
            minW: '70%',
            mx: 0,
            mb: 0,
          })}
        >
          <Wrap
            justify={{ base: 'center', md: 'space-between' }}
            fontSize="sm"
            color="gray.500"
          >
            <HStack>
              <HStack>
                <Icon as={FaCalendarDay} />
                <Text>
                  <FormattedDate date={post.publishedAt as string} />
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaClock} />
                <Text>{readingTime}</Text>
              </HStack>
            </HStack>
            <HStack>
              {post.likes && (
                <HStack>
                  <Box as={FaHeart} />
                  <Text>{post.likes}</Text>
                </HStack>
              )}
              {post.views && (
                <HStack>
                  <Box as={FaEye} />
                  <Text>{post.views}</Text>
                </HStack>
              )}
            </HStack>
          </Wrap>
          <Heading as="h3" size="md">
            {post.title}
          </Heading>
          <Text noOfLines={2}>{post.description}</Text>
        </Stack>
      </Box>
    </Navigate>
  )
}
