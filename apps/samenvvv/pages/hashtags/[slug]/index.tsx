import { FC, useEffect, useState } from 'react'

import {
  Box,
  Collapse,
  Heading,
  IconButton,
  Text,
  Tooltip,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { FaChevronDown, FaChevronUp, FaHashtag } from 'react-icons/fa'

import {
  getHashtagBySlug,
  HashtagReturnType,
  searchModel,
  SearchModelArgs,
  setRandomPost,
  useHashtag,
  useSearchModel,
} from '@wsvvrijheid/services'
import {
  checkSharedPosts,
  setDefaultHashtags,
  setDefaultTab,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/store'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import {
  Container,
  PostMaker,
  StepsContent,
  usePostMakerSteps,
} from '@wsvvrijheid/ui'
import { getPageSeo } from '@wsvvrijheid/utils'

import { HashtagsDrawer, Layout, TimeLeft } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

interface HashtagProps {
  source: MDXRemoteSerializeResult<Record<string, unknown>>
  seo: NextSeoProps
  hasPassed: boolean
  hasStarted: boolean
  defaultHashtags: string[]
}

const Hashtag: FC<HashtagProps> = ({
  seo,
  hasPassed,
  hasStarted,
  defaultHashtags,
}) => {
  const { defaultTab } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const { locale } = useRouter()

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: locale as StrapiLocale,
  })
  const hashtagQuery = useHashtag()

  const [show, setShow] = useState<boolean>(false)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleToggle = () => setShow(!show)

  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const postMakerSteps = usePostMakerSteps()
  const steps = isMobile ? postMakerSteps.mobile : postMakerSteps.desktop
  const disableBody = (target: Element | null) =>
    target && disableBodyScroll(target)
  const enableBody = (target: Element | null) =>
    target && enableBodyScroll(target)

  useEffect(() => {
    if (defaultHashtags.length > 0)
      dispatch(setDefaultHashtags(defaultHashtags))

    if (hasPassed && defaultTab === null) dispatch(setDefaultTab(1))
  }, [defaultHashtags, dispatch, hasPassed, defaultTab])

  useEffect(() => {
    dispatch(checkSharedPosts())
  }, [dispatch])

  return (
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
        <HashtagsDrawer
          isOpen={isOpen}
          onClose={onClose}
          hashtags={hashtagsQuery.data?.data}
        />

        <Container py={4} pos="relative">
          <Box flex={1} textAlign="center">
            <Heading>
              {hashtagQuery.data?.title}
              <Tooltip label={t`post.all-hashtags`} hasArrow bg="primary.400">
                <IconButton
                  aria-label="open hashtags"
                  onClick={onOpen}
                  icon={<FaHashtag />}
                  size="lg"
                  title={t`post.all-hashtags`}
                  rounded="full"
                  pos={{ base: 'static', lg: 'absolute' }}
                  top={4}
                  right={2}
                />
              </Tooltip>
            </Heading>

            <Collapse startingHeight={50} in={show}>
              <Text my={4} maxW="container.md" mx="auto">
                {hashtagQuery.data?.content}
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
            <TimeLeft date={hashtagQuery?.data?.date as string} />
          )}
        </Container>
      </Layout>
    </TourProvider>
  )
}

export default Hashtag

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const slug = context.params?.slug as string

  const queryClient = new QueryClient()
  const queryKey = ['hashtag', locale, slug]

  const args: SearchModelArgs<Hashtag> = {
    url: 'api/hashtags',
    locale,
    statuses: ['approved'],
  }

  await queryClient.prefetchQuery({
    queryKey: Object.values(args),
    queryFn: () => searchModel<Hashtag>(args),
  })

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

  setRandomPost(queryClient, locale, slug)

  const seo: NextSeoProps = getPageSeo(hashtag, locale, 'hashtag')

  const source = await serialize(hashtag?.content || '')

  return {
    props: {
      source,
      seo,
      slugs: { ...slugs, [locale]: slug },
      hasPassed: hashtag.hasPassed,
      hasStarted: hashtag.hasStarted,
      defaultHashtags: hashtag.defaultHashtags,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
    },
  }
}
