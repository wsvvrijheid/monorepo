import { FC, useEffect, useState } from 'react'

import {
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
  SimpleGrid,
  Box,
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  RecommendedTweet,
  StrapiLocale,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import { Container, MasonryGrid, RecommendedTweetCard } from '@wsvvrijheid/ui'
import { getLocalizedSlugs, getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../components'

type RecommendsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const RecommendsPage: FC<RecommendsPageProps> = ({ tweet, tweets, seo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [tweetsState, setTweetsState] = useState(tweets)
  const [searchKey, setSearchKey] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }

  useEffect(() => {
    if (searchKey) {
      const filteredTweets = tweets.filter(t => {
        // Regex to match the search key
        const regex = new RegExp(searchKey, 'gi')

        return t.text.match(regex)
      })
      setTweetsState(filteredTweets)
    } else {
      setTweetsState(tweets)
    }
  }, [searchKey])

  useEffect(() => {
    if (tweet) {
      onOpen()
    }
  }, [tweet])

  const handleClose = () => {
    onClose()
  }

  // It is for single tweet
  return (
    <Layout seo={seo}>
      <NextSeo {...seo} />

      <Modal size={'6xl'} isOpen={isOpen && !!tweet} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody p={{ base: 8, lg: 16 }}>
            {tweet && <RecommendedTweetCard key={tweet.id} tweet={tweet} />}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Container my={8}>
        <Stack spacing={4}>
          <Input
            size={'lg'}
            onChange={handleSearch}
            value={searchKey}
            placeholder="Search tweets"
            bg={'whiteAlpha.500'}
            _focus={{
              bg: 'white',
            }}
          />

          <MasonryGrid cols={{ base: 1, lg: 2 }}>
            {tweetsState?.map(t => (
              <RecommendedTweetCard key={t.id} tweet={t} />
            ))}
          </MasonryGrid>
        </Stack>
      </Container>
    </Layout>
  )
}
export default RecommendsPage

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  // const slug = context.params?.slug as string

  const queryClient = new QueryClient()
  // const queryKey = ['news', locale, slug]

  const id = context.query.id as string

  let recommendedTweet: RecommendedTweet | null = null
  let slugs = {}

  let seo: NextSeoProps = {
    title: 'Recommended Tweets',
  }

  if (id) {
    await strapiRequest<RecommendedTweet>({
      endpoint: 'recommended-tweets',
      id: Number(id),
      populate: ['localizations'],
    })
      .then(res => {
        if (res.data) {
          recommendedTweet = res.data
          seo = getPageSeo(recommendedTweet, 'recommended-tweets', locale)
          slugs = getLocalizedSlugs(
            recommendedTweet as unknown as StrapiTranslatableModel,
            locale,
          )
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const response = await strapiRequest<RecommendedTweet>({
    endpoint: 'recommended-tweets',
    locale,
    pageSize: 100,
  })
  const recommendedTweets = response.data

  return {
    props: {
      seo,
      tweet: recommendedTweet as RecommendedTweet | null,
      tweets: recommendedTweets,
      slugs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
