import { FC } from 'react'

import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { isPast } from 'date-fns'
import { GetServerSidePropsContext } from 'next'
import { useTranslation } from 'next-i18next'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'

import { RequestCollectionArgs, strapiRequest } from '@wsvvrijheid/lib'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import {
  Hashtag,
  StrapiCollectionResponse,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { Container, HashtagAnnouncement, Hero, Navigate } from '@wsvvrijheid/ui'
import { getItemLink, getPageSeo } from '@wsvvrijheid/utils'

import { Layout } from '../components'

type HashtagEventsProps = {
  seo: NextSeoProps
  source: MDXRemoteSerializeResult
  hashtag: Hashtag
  hasStarted: boolean
  link: string
}

const AnnouncementEvent: FC<HashtagEventsProps> = ({
  seo,
  hashtag,
  hasStarted,
  link,
}) => {
  const { t } = useTranslation()
  const title = seo?.title || t('hashtag-announcements')

  return (
    <Layout seo={{ title }} isDark>
      <Hero title={title} isFullHeight={false} />
      <Box py={16}>
        <Container maxW={'4xl'}>
          {hashtag && !hasStarted ? (
            <HashtagAnnouncement hashtag={hashtag} link={link} />
          ) : (
            <VStack mx={'auto'} maxW={'2xl'} textAlign={'center'} spacing={8}>
              <Text fontSize={'lg'} color={'primary'}>
                {t('join-previous-hashtag')}
              </Text>
              <Navigate href={link || `/hashtags`}>
                <Button>{t('join-link')}</Button>
              </Navigate>
            </VStack>
          )}
        </Container>
      </Box>
    </Layout>
  )
}

export default AnnouncementEvent

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: RequestCollectionArgs = {
    endpoint: 'hashtags',
    locale,
    sort: ['date:desc'],
    filters: {
      approvalStatus: { eq: 'approved' },
    },
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery(queryKey, () => strapiRequest<Hashtag>(args))

  const hashtagsResponse =
    queryClient.getQueryData<StrapiCollectionResponse<Hashtag[]>>(queryKey)

  const hashtag = hashtagsResponse?.data?.[0]

  if (!hashtag) {
    return {
      props: {
        ...(await ssrTranslations(locale)),
        hashtag: null,
      },
    }
  }

  const link = getItemLink(hashtag, 'hashtags') as string

  const seo = getPageSeo(hashtag, 'hashtags', locale, true)

  const source = await serialize(hashtag.content || '')
  const hasStarted = hashtag.date
    ? isPast(new Date(hashtag.date as string))
    : false

  return {
    props: {
      ...(await ssrTranslations(locale)),
      seo,
      source,
      hashtag,
      hasStarted,
      link,
    },
  }
}
