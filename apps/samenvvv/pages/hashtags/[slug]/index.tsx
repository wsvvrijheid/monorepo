import { FC, useState } from 'react'

import {
  Box,
  Collapse,
  Heading,
  IconButton,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

import { HashtagProvider } from '@wsvvrijheid/context'
import {
  HashtagReturnType,
  getHashtagBySlug,
  useHashtag,
} from '@wsvvrijheid/services'
import { StrapiLocale, Trend } from '@wsvvrijheid/types'
import {
  Container,
  PostMaker,
  StepsContent,
  usePostMakerSteps,
} from '@wsvvrijheid/ui'
import { getPageSeo } from '@wsvvrijheid/utils'

import { Layout, TimeLeft } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type HashtagProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HashtagPage: FC<HashtagProps> = ({ hasStarted, seo }) => {
  const hashtagQuery = useHashtag()

  const hashtag = hashtagQuery.data

  const [show, setShow] = useState<boolean>(false)

  const handleToggle = () => setShow(!show)

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const postMakerSteps = usePostMakerSteps()
  const steps = isMobile ? postMakerSteps.mobile : postMakerSteps.desktop
  const disableBody = (target: Element | null) =>
    target && disableBodyScroll(target)
  const enableBody = (target: Element | null) =>
    target && enableBodyScroll(target)

  if (!hashtag) return null

  return (
    <HashtagProvider hashtag={hashtag}>
      <TourProvider
        steps={steps}
        components={{}}
        afterOpen={disableBody}
        beforeClose={enableBody}
        ContentComponent={StepsContent}
        padding={{ mask: 6 }}
        styles={{
          popover: base => ({
            ...base,
            padding: 4,
            backgroundColor: 'transparent',
          }),
        }}
      >
        <Layout seo={seo}>
          <Container py={4} pos="relative">
            <Box flex={1} textAlign="center">
              <Heading>{hashtag.title}</Heading>

              <Collapse startingHeight={50} in={show}>
                <Text my={4} maxW="container.md" mx="auto">
                  {hashtag.content}
                </Text>
              </Collapse>
              <IconButton
                variant="ghost"
                size="sm"
                icon={show ? <FaChevronUp /> : <FaChevronDown />}
                aria-label={show ? 'up' : 'down'}
                _hover={{ bg: 'transparent' }}
                onClick={handleToggle}
              />
            </Box>
            {hasStarted ? (
              <PostMaker />
            ) : (
              <TimeLeft date={hashtag.date as string} />
            )}
          </Container>
        </Layout>
      </TourProvider>
    </HashtagProvider>
  )
}

export default HashtagPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.slug as string

  const queryClient = new QueryClient()
  const queryKey = ['hashtag', locale, slug]

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => getHashtagBySlug(locale, slug),
  })

  const hashtag = queryClient.getQueryData<HashtagReturnType>(queryKey)

  if (!hashtag) {
    return { notFound: true }
  }

  const slugs =
    hashtag.localizations?.reduce(
      (acc, l) => {
        return {
          ...acc,
          [l.locale as StrapiLocale]: l.slug,
        }
      },
      { en: '', nl: '', tr: '' },
    ) || {}

  const seo: NextSeoProps = getPageSeo(hashtag, locale, 'hashtag')

  const source = await serialize(hashtag?.content || '')

  return {
    props: {
      source,
      seo,
      slugs: { ...slugs, [locale]: slug },
      initialTrend: {} as Trend,
      hasStarted: hashtag.hasStarted,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
    },
  }
}
