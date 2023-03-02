import { useEffect } from 'react'

import {
  Box,
  Button,
  Center,
  HStack,
  Link,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react'
import { QueryClient } from '@tanstack/react-query'
import {
  searchModel,
  SearchModelArgs,
  useSearchModel,
} from '@wsvvrijheid/services'
import { Hashtag, StrapiLocale } from '@wsvvrijheid/types'
import {
  Container,
  FormattedDate,
  Hero,
  Markdown,
  ShareButtons,
} from '@wsvvrijheid/ui'
import { getItemLink } from '@wsvvrijheid/utils'
import { addDays, isPast } from 'date-fns'
import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { NextSeoProps } from 'next-seo'
import { GrAnnounce } from 'react-icons/gr'

import i18nConfig from '..//next-i18next.config'
import { Layout } from '../components'

interface HashtagEventsProps {
  hashtags: Hashtag[]
  seo: NextSeoProps
  source: MDXRemoteSerializeResult<Record<string, unknown>>
}

const HashtagEvents = ({ seo, source }: HashtagEventsProps) => {
  const router = useRouter()
  // const [sort, setSort] = useState<'desc' | 'asc' | null>(null)
  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: router.locale as StrapiLocale,
    pageSize: 1,
  })
  useEffect(() => {
    if (hasPassed) {
      router.push('./')
    }
  }, [])

  const latestHashtag = hashtagsQuery?.data?.data?.[0] || null
  const link = getItemLink(latestHashtag, latestHashtag?.locale, 'hashtag')

  const hashtag = hashtagsQuery?.data?.data?.[0] //get newest hashtag here
  const hashtagAnounscements = {
    title: 'ETKINLIK DUYURUSU',
    description: hashtag?.description,
    date: hashtag?.date,
    defaultCaps: '',
    hashtag:
      hashtag?.hashtagDefault ||
      hashtag?.hashtagExtra ||
      'Hashtag saatinde yayinlanacak',
    content: hashtag?.content,
  }

  console.log('samen anounscement >>', hashtagAnounscements)
  const date = (
    <FormattedDate
      date={(hashtagAnounscements.date + 2) as string}
      format="hh:mm"
    />
  )

  //const newformat = format(new Date(hashtag?.date), 'dd MMMM yyyy')
  console.log('new date', Number(date.props.date))

  const hasPassed = isPast(addDays(new Date(hashtag?.date as string), 1))
  const hasStarted = isPast(new Date(hashtag?.date as string))
  const today = new Date()
  //format(new Date(hashtag?.date as string), 'dd MMMM yyyy')
  console.log('hashtag >>>>>>', hashtag)
  console.log('hasPassed', hasPassed)
  console.log('hasStarted', hasStarted)
  console.log(
    'Today ....',
    today,
    'hashtag date :::',
    hashtagAnounscements?.date,
  )
  const now = new Date(hashtag?.date)
  console.log('now', now.getHours() + 2)
  return (
    <Layout seo={seo} isDark>
      <Hero title={seo.title as string} isFullHeight={false} />
      <Container overflowX="hidden">
        {source && (
          <Box my={8} maxW="container.md" mx="auto" textAlign="center">
            <Markdown source={source} />
          </Box>
        )}

        <Stack spacing={4} mb={8} mt={8} ml={8}>
          <Center>
            <HStack alignItems="center">
              <Button
                // as={Icon}
                colorScheme={'primary'}
                aria-label="create"
                leftIcon={<GrAnnounce />}
                rightIcon={<GrAnnounce />}
              >
                <Text>{hashtagAnounscements.title}</Text>
              </Button>
            </HStack>
          </Center>
          <VStack alignItems={'start'} p={4}>
            <HStack>
              <Text fontWeight={'bold'}>Konu: </Text>
              <Text> {hashtagAnounscements?.description}</Text>
            </HStack>

            <HStack>
              <VStack alignItems={'start'}>
                {' '}
                <HStack>
                  {' '}
                  <Text fontWeight={'bold'}>Tarih: </Text>
                  <Text>
                    <FormattedDate
                      date={hashtagAnounscements.date as string}
                      format="dd MMMM yyyy"
                    />
                  </Text>
                </HStack>
                <VStack p={4}>
                  {' '}
                  <Text>
                    🇳🇱{' '}
                    <FormattedDate
                      date={hashtagAnounscements.date as string}
                      format="hh:mm "
                    />
                  </Text>
                  <Text>
                    {' '}
                    🇹🇷
                    <FormattedDate
                      date={hashtagAnounscements.date as string}
                      format="hh:mm "
                    />
                  </Text>
                </VStack>
              </VStack>
            </HStack>
            <HStack>
              <Text fontWeight={'bold'}>Hashtag: </Text>
              <Text>{hashtagAnounscements?.hashtag}</Text>
            </HStack>

            <Text>{hashtagAnounscements?.content}</Text>
            <Link href={link}>
              <Text fontWeight={'bold'} color={'primary'} m={4}>
                Hashtag Etkinligine Katil
              </Text>
            </Link>
            <ShareButtons
              //  title={`📢${hashtagAnounscements.title}`}
              url={hashtagAnounscements.url}
              //TODO create caps for announcement
              quote={
                `📢${hashtagAnounscements.title} \n\n Konu: ${
                  hashtagAnounscements?.description
                }\n\nTarih: ${hashtagAnounscements?.date}\n\n 🇹🇷 ${
                  hashtagAnounscements?.date + 2
                }\n 🇳🇱 ${hashtagAnounscements?.date} \n\n${
                  hashtagAnounscements.content
                } \n` || ''
              }
            />
          </VStack>
        </Stack>
      </Container>
    </Layout>
  )
}

export default HashtagEvents

export const getStaticProps: GetStaticProps = async context => {
  const locale = context.locale as StrapiLocale
  const queryClient = new QueryClient()

  const args: SearchModelArgs<Hashtag> = {
    url: 'api/hashtags',
    locale,
    statuses: ['approved'],
    pageSize: 1,
  }

  const queryKey = Object.values(args)

  await queryClient.prefetchQuery(queryKey, () => searchModel<Hashtag>(args))

  const hashtags = queryClient.getQueryData<Hashtag[]>(queryKey)

  const title = {
    en: 'Hashtag Announcement',
    nl: 'Hashtag Announcement',
    tr: 'Hashtag Duyurulari',
  }

  const description = {
    en: '',
    nl: '',
    tr: '',
  }

  const content = {
    en: ``,
    nl: ``,
    tr: ``,
  }

  const seo: NextSeoProps = {
    title: title[locale],
    description: description[locale],
  }

  const source = (await serialize(content[locale].trim())) || null

  return {
    props: {
      ...(await serverSideTranslations(
        locale as StrapiLocale,
        ['common'],
        i18nConfig,
      )),
      hashtags,
      seo,
      source,
    },
  }
}
