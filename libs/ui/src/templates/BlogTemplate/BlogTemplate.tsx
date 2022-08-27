import { FC } from 'react'
import { Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { StrapiLocale } from '@wsvvrijheid/types'
import { NextSeoProps } from 'next-seo'
import { useGetBlogs } from '@wsvvrijheid/utils'
import { Container, BlogCard, AnimatedBox } from '../../components'

export type BlogTemplateProps = {
  seo: NextSeoProps
  locale: StrapiLocale
}

export const BlogTemplate: FC<BlogTemplateProps> = ({ seo, locale }) => {
  const { data: blogs } = useGetBlogs()

  //const queryClient = new QueryClient()
  // const getBlogByLocale = async () => {
  //   await queryClient.prefetchQuery({
  //     queryKey: ['blogs', locale],
  //     queryFn: () => getBlogs(locale),
  //   })
  // }
  // useEffect(() => {
  //   getBlogByLocale()
  // }, [locale])

  // console.log({ blogs, locale })
  return (
    <>
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
            Sorry! No articles published in this language.
          </Text>
        </Stack>
      )}
    </>
  )
}
