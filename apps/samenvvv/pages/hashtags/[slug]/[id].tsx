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
import { API_URL, VERCEL_URL } from '@wsvvrijheid/config'
import { getModelById } from '@wsvvrijheid/services'
import { Post, StrapiLocale } from '@wsvvrijheid/types'
import { PostImage } from '@wsvvrijheid/ui'
import { getItemLink, getOgImageSrc } from '@wsvvrijheid/utils'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeo, NextSeoProps } from 'next-seo'

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
      <Modal isCentered isOpen={true} onClose={() => null}>
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={0}>
            <Stack>
              <PostImage post={post} />
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
  const adminUrl = API_URL as string
  const image = post?.image
  const url = getItemLink(post, locale, 'post') as string

  const images = image && [
    {
      url: 'https://' + VERCEL_URL + getOgImageSrc(post.imageParams),
      secureUrl: adminUrl + image.url,
      type: image.mime as string,
      width: 1200,
      height: 675,
      alt: title,
    },
  ]

  const seo: NextSeoProps = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images,
    },
  }

  return {
    props: {
      link: url,
      seo,
      post,
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
    },
  }
}
