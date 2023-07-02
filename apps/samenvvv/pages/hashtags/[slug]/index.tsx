import { FC, useEffect } from 'react'

import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useBreakpointValue,
  useDisclosure,
} from '@chakra-ui/react'
import { TourProvider } from '@reactour/tour'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'
import { getCookie } from 'cookies-next'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { i18nConfig } from '@wsvvrijheid/config'
import {
  getHashtagBySlug,
  getHashtagSentences,
  getModelById,
  useHashtag,
} from '@wsvvrijheid/services'
import { HashtagReturnType, Post, StrapiLocale } from '@wsvvrijheid/types'
import {
  Container,
  HashtagProvider,
  PostImage,
  PostMaker,
  StepsContent,
  TimeLeft,
  usePostMakerSteps,
} from '@wsvvrijheid/ui'
import { getItemLink, getOgImageSrc, getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../../../components'

type HashtagProps = InferGetServerSidePropsType<typeof getServerSideProps>

const HashtagPage: FC<HashtagProps> = ({
  hasStarted,
  seo,
  post,
  capsSrc,
  isAdminMode,
  isIosSafari,
}) => {
  const hashtag = useHashtag()

  const { isOpen, onClose, onOpen } = useDisclosure()
  const { query, push } = useRouter()

  const { t } = useTranslation()

  const isMobile = useBreakpointValue({ base: true, lg: false })
  const postMakerSteps = usePostMakerSteps()
  const steps = isMobile ? postMakerSteps.mobile : postMakerSteps.desktop
  const disableBody = (target: Element | null) =>
    target && disableBodyScroll(target)
  const enableBody = (target: Element | null) =>
    target && enableBodyScroll(target)

  useEffect(() => {
    if (post) {
      onOpen()
    }
  }, [post])

  const handleClose = () => {
    onClose()
    if (query.id) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { id, ...q } = query
      push({ query: q }, undefined, { shallow: true })
    }
  }

  if (!hashtag) return null

  return (
    <HashtagProvider>
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
        {capsSrc && (
          <Head>
            <meta property="twitter:image:src" content={capsSrc} />
          </Head>
        )}
        {post && (
          <Modal isCentered isOpen={isOpen} onClose={handleClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalBody p={0}>
                <Stack>
                  <PostImage size="sm" post={post} />
                  <Box p={8}>{post.description}</Box>
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleClose}>
                  {t('post.see-other-posts')}
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
        <Layout seo={seo}>
          <Container py={4} pos="relative">
            {hasStarted || isAdminMode ? (
              <PostMaker isAdminMode={isAdminMode} isIosSafari={isIosSafari} />
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
  const { req, res, query } = context
  const adminMode = getCookie('admin-mode', { req, res })

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

  const post = query.id
    ? await getModelById<Post>({
        url: 'api/posts',
        id: Number(query.id),
      })
    : null

  let seo = getPageSeo(hashtag, locale, 'hashtag')
  let capsSrc = ''

  if (post) {
    const title = post?.description?.slice(0, 20) || ''
    const description = post.description || ''
    const image = post?.image
    const caps = post?.caps?.url

    let src = image?.url
    const link = getItemLink(post, locale, 'post') as string

    if (caps) {
      capsSrc = `${ASSETS_URL}${caps}`
    } else {
      if (image?.formats?.small) {
        src = image.formats.small.url
      } else if (image?.formats?.medium) {
        src = image.formats.medium.url
      } else if (image?.formats?.large) {
        src = image.formats.large.url
      }

      capsSrc =
        SITE_URL +
        getOgImageSrc({
          title: post.title,
          text: post.description || undefined,
          image: src ? `${ASSETS_URL}${src}` : undefined,
          ...post.imageParams,
        })
    }

    const images = image && [
      {
        url: capsSrc,
        secureUrl: capsSrc,
        type: image.mime as string,
        width: 1200,
        height: 675,
        alt: title,
      },
    ]

    const twitterHandle = {
      en: '@samenvvvEn',
      nl: '@samenvvv',
      tr: '@samenvvvTr',
    }

    seo = {
      title,
      description,
      twitter: {
        cardType: 'summary_large_image',
        site: twitterHandle[locale],
        handle: twitterHandle[locale],
      },
      openGraph: {
        title,
        description,
        url: link,
        images,
      },
    }
  }

  const userAgent = req.headers['user-agent'] as string
  const isIOS = /iPad|iPhone|iPod/.test(userAgent)
  const isSafari = /Safari/.test(userAgent) && !/Chrome/.test(userAgent)
  const isIosSafari = isIOS && isSafari

  await queryClient.prefetchQuery({
    queryKey: ['kv-hashtag-sentences', hashtag.id],
    queryFn: () => getHashtagSentences(hashtag.id),
    staleTime: 1000 * 60,
  })

  const slugs =
    hashtag.localizations?.reduce(
      (acc, l) => {
        return {
          ...acc,
          [l.locale]: l.slug,
        }
      },
      { en: '', nl: '', tr: '' },
    ) || {}

  return {
    props: {
      seo: {
        ...seo,
      },
      capsSrc: capsSrc || null,
      post: post || null,
      isIosSafari,
      isAdminMode: adminMode === true,
      slugs: { ...slugs, [locale]: slug },
      hasStarted: hashtag.hasStarted,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  }
}
