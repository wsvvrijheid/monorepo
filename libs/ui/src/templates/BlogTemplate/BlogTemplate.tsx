import { FC } from 'react'

import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { API_URL } from '@wsvvrijheid/config'
import { Blog } from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { NextSeoProps } from 'next-seo'

import { Container, BlogCard, AnimatedBox, Hero } from '../../components'

export type BlogTemplateProps = {
  seo: NextSeoProps
  blogs: Blog[]
}

export const BlogTemplate: FC<BlogTemplateProps> = ({ seo, blogs }) => {
  const { t } = useTranslation()

  if (!blogs.length) {
    return (
      <Stack minH="inherit" justify="center" align="center" spacing={8}>
        <Image
          h={200}
          src={`${API_URL}/uploads/no_blog_1eaf8feac1.svg`}
          alt="no blog"
        />
        <Text textAlign="center" fontSize="lg">
          {t('blog-no-content')}
        </Text>
      </Stack>
    )
  }

  return (
    <>
      <Hero
        title={seo.title as string}
        image={`${API_URL}/uploads/blog_bg_ffd7164ce7.jpeg`}
      />
      <Container maxW="container.lg">
        <SimpleGrid gap={8} py={8} columns={{ base: 1, lg: 2 }}>
          {blogs.map((blog, index) => (
            <AnimatedBox
              key={index}
              directing="to-down"
              delay={index * 0.5}
              gridColumn={{
                base: undefined,
                lg: index === 0 ? 'span 2' : undefined,
              }}
              h="full"
            >
              <BlogCard isFeatured={index === 0} post={blog} />
            </AnimatedBox>
          ))}
        </SimpleGrid>
      </Container>
    </>
  )
}
