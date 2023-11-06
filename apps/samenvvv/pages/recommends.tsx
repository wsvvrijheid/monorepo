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
} from '@chakra-ui/react'
import { QueryClient, dehydrate } from '@tanstack/react-query'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { NextSeo, NextSeoProps } from 'next-seo'

import { strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  RecommendedTopic,
  StrapiLocale,
  StrapiTranslatableModel,
} from '@wsvvrijheid/types'
import { Container, TopicCard } from '@wsvvrijheid/ui'
import { getLocalizedSlugs, getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../components'

type RecommendsPageProps = InferGetServerSidePropsType<
  typeof getServerSideProps
>

const RecommendsPage: FC<RecommendsPageProps> = ({ topic, topics, seo }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [topicsState, setTopicsState] = useState(topics)
  const [searchKey, setSearchKey] = useState('')

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }

  useEffect(() => {
    if (searchKey) {
      const filteredTopics = topics.filter(topic => {
        const content = `${topic.title}  ${topic.description}`

        // Regex to match the search key
        const regex = new RegExp(searchKey, 'gi')

        return content.match(regex)
      })
      setTopicsState(filteredTopics)
    } else {
      setTopicsState(topics)
    }
  }, [searchKey])

  useEffect(() => {
    if (topic) {
      onOpen()
    }
  }, [topic])

  const handleClose = () => {
    onClose()
  }

  // It is for single topic
  return (
    <Layout seo={seo}>
      <NextSeo {...seo} />

      <Modal isOpen={isOpen && !!topic} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
            {topic && <TopicCard key={topic.id} topic={topic} />}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Container my={8}>
        <Stack spacing={4}>
          <Input
            size={'lg'}
            onChange={handleSearch}
            value={searchKey}
            placeholder="Search topics"
            bg={'whiteAlpha.500'}
            _focus={{
              bg: 'white',
            }}
          />

          {topicsState?.map(topic => (
            <TopicCard key={topic.id} topic={topic} />
          ))}
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

  let recommendedTopic: RecommendedTopic | null = null
  let slugs = {}

  let seo: NextSeoProps = {
    title: 'Recommended Topics',
  }

  if (id) {
    const topic = await strapiRequest<RecommendedTopic>({
      endpoint: 'recommended-topics',
      id: Number(id),
      populate: ['localizations'],
    })

    recommendedTopic = topic.data
    seo = getPageSeo(recommendedTopic, 'recommended-topics', locale)
    slugs = getLocalizedSlugs(
      recommendedTopic as unknown as StrapiTranslatableModel,
      locale,
    )
  }

  const response = await strapiRequest<RecommendedTopic>({
    endpoint: 'recommended-topics',
    locale,
    pageSize: 100,
  })
  const recommendedTopics = response.data

  return {
    props: {
      seo,
      topic: recommendedTopic,
      topics: recommendedTopics,
      slugs,
      dehydratedState: dehydrate(queryClient),
      ...(await ssrTranslations(locale)),
    },
  }
}
