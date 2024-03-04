import { FC } from 'react'

import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import { isPast } from 'date-fns'
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { useTranslation } from 'next-i18next'
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

type HashtagEventsProps = InferGetServerSidePropsType<typeof getServerSideProps>

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
          {hashtag && link && !hasStarted ? (
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

  const args: RequestCollectionArgs<Hashtag> = {
    endpoint: 'hashtags',
    locale,
    sort: ['date:desc'],
    filters: {
      approvalStatus: { $eq: 'approved' },
    },
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery({
    queryKey,
    queryFn: () => strapiRequest<Hashtag>(args),
  })

  const hashtagsResponse =
    queryClient.getQueryData<StrapiCollectionResponse<Hashtag[]>>(queryKey)

  const hashtag = hashtagsResponse?.data?.[0]

  if (!hashtag) {
    return {
      props: {
        ...(await ssrTranslations(locale)),
        seo: {} as NextSeoProps,
        hasStarted: true,
        hashtag: null,
        link: null,
      },
    }
  }

  const link = getItemLink(hashtag, 'hashtags')

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
