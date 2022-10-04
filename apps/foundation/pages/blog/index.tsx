import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { AnimatedBox, BlogCard, Container, Hero } from '@wsvvrijheid/ui'
import { getBlogs, useGetBlogs } from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { Layout } from '../../components'
import i18nConfig from '../../next-i18next.config'

// TODO: Implement author filter
const Blogs = ({ seo }) => {
  const { data: blogs } = useGetBlogs()
  const { t } = useTranslation()

  return (
    <Layout seo={seo} isDark>
      <Hero
        title="Blog"
        image="https://api.samenvvv.nl/uploads/blog_bg_ffd7164ce7.jpeg"
      />
      {blogs?.[0] ? (
        <>
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
      ) : (
        <Stack minH="inherit" justify="center" align="center" spacing={8}>
          <Image h={200} src="/images/no-blog.svg" alt="no blog" />
          <Text textAlign="center" fontSize="lg">
            {t`blog-no-content`}
          </Text>
        </Stack>
      )}
    </Layout>
  )
}

export default Blogs

export const getStaticProps = async context => {
  const queryClient = new QueryClient()

  const locale = context.locale

  await queryClient.prefetchQuery({
    queryKey: ['blogs', locale],
    queryFn: () => getBlogs(locale),
  })

  const blogSeo = {
    en: {
      title: 'Blog',
      description: 'Posts',
    },
    nl: {
      title: 'Blog',
      description: 'Posts',
    },
    tr: {
      title: 'Blog',
      description: 'Yazılar',
    },
  }

  const seo = blogSeo[locale]

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
