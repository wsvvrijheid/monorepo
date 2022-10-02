import { FC } from 'react'

import { Avatar, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { dehydrate } from '@tanstack/react-query'
import { API_URL } from '@wsvvrijheid/config'
import { StrapiLocale } from '@wsvvrijheid/types'
import { ArtCard, Hero, Container } from '@wsvvrijheid/ui'
import {
  getArtistPaths,
  getArtistStaticProps,
  useArtistByUsername,
} from '@wsvvrijheid/utils'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'
import { useRouter } from 'next/router'

import { Layout } from '../../../components'
import i18nConfig from '../../../next-i18next.config'

type ArtistPageProps = {
  seo: NextSeoProps
}

const ArtistPage: FC<ArtistPageProps> = ({ seo }) => {
  const {
    query: { username },
  } = useRouter()

  const { data: artist, isLoading } = useArtistByUsername(username as string)

  return (
    <Layout seo={seo} isDark isLoading={isLoading} hasScroll>
      <Hero>
        <Stack align="center" cursor="default" userSelect="none">
          <Avatar
            size="lg"
            src={`${API_URL}${artist?.avatar?.formats.thumbnail.url}` || null}
            name={artist?.name || artist?.username}
          />

          <Text color={'white'}>{artist?.name || artist?.username}</Text>
        </Stack>
      </Hero>
      <Container mt={'80px'}>
        <SimpleGrid m={4} gap={8} columns={{ base: 1, md: 2, lg: 4 }}>
          {artist?.arts?.map(art => (
            <ArtCard key={art.id} art={art} />
          ))}
        </SimpleGrid>
      </Container>
    </Layout>
  )
}
export default ArtistPage

export const getStaticPaths = async context => {
  const paths = await getArtistPaths(context.locales)

  return {
    paths,
    fallback: true,
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { seo, queryClient } = await getArtistStaticProps(context)
  const locale = context.locale as StrapiLocale

  return {
    props: {
      seo,
      dehydratedState: dehydrate(queryClient),
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
    revalidate: 1,
  }
}
