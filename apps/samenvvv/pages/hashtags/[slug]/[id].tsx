import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
} from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'

import { ASSETS_URL, SITE_URL } from '@wsvvrijheid/config'
import { getModelById } from '@wsvvrijheid/services'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { PostImage } from '@wsvvrijheid/ui'
import { getItemLink, getOgImageSrc } from '@wsvvrijheid/utils'

import i18nConfig from '../../../next-i18next.config'

interface PostProps {
  seo: NextSeoProps
  post: Post
}

const Post = ({ seo, post }: PostProps) => {
  const router = useRouter()

  const back = () => {
    router.push('/hashtags/[slug]', `/hashtags/${post.hashtag.slug}`)
  }

  return (
    <>
      <NextSeo {...seo} />
      <Head>
        <meta
          property="twitter:image:src"
          content={seo.openGraph.images[0].url}
        />
      </Head>
      <Modal isCentered isOpen={true} onClose={() => null}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Stack>
              <PostImage size="sm" post={post} />
              <Box p={8}>{post.description}</Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={back}>See other posts</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default Post

export const getServerSideProps: GetServerSideProps = async context => {
  const locale = context.locale as StrapiLocale
  const id = context.params?.id as string

  const post = await getModelById<Post>({
    url: 'api/posts',
    id: Number(id),
  })

  if (!post) {
    return { notFound: true }
  }

  const title = post?.description.slice(0, 20)
  const description = post.description
  const image = post?.image
  let src = image?.url
  const link = getItemLink(post, locale, 'post') as string

  if (image?.formats?.small) {
    src = image.formats.small.url
  } else if (image?.formats?.medium) {
    src = image.formats.medium.url
  } else if (image?.formats?.large) {
    src = image.formats.large.url
  }

  const imgSrc =
    SITE_URL +
    getOgImageSrc({
      title: post.title,
      text: post.description,
      image: src ? `${ASSETS_URL}${src}` : undefined,
      ...post.imageParams,
    })

  const images = image && [
    {
      url: imgSrc,
      secureUrl: imgSrc,
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

  const seo: NextSeoProps = {
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

  return {
    props: {
      link,
      seo,
      imgSrc,
      post,
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
    },
  }
}
