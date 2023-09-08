import { FC, useCallback, useEffect, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  IconButton,
  MenuItemOption,
  MenuOptionGroup,
  SimpleGrid,
  Spinner,
  Tooltip,
} from '@chakra-ui/react'
import { addHours, formatDistanceToNow, isPast } from 'date-fns'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'
import { AiOutlineClear } from 'react-icons/ai'
import { FaArrowDown, FaArrowUp, FaSyncAlt } from 'react-icons/fa'

import { useAuthContext } from '@wsvvrijheid/context'
import { useTopic, useTopicSync } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { StrapiLocale, TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, PageHeader, TopicCard } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const NewsPage: FC<PageProps> = ({ seo }) => {
  const { data, isLoading } = useTopic()
  const syncTopic = useTopicSync()
  const [sources, setSources] = useState<string[]>([])
  const [filter, setFilter] = useState<string[]>([])
  const [topics, setTopics] = useState<TopicBase[]>([])
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sortDirection, setSortDirection] = useState<'DESC' | 'ASC'>('DESC')
  const { roles } = useAuthContext()

  const isAdmin = roles?.includes('admin')

  const router = useRouter()
  const locale = router.locale

  const search = useCallback(
    (topics: TopicBase[]) => {
      const results: TopicBase[] = []
      const keywords = searchTerm?.split(' ') || []
      const searchRegex = new RegExp(keywords.join('|'), 'gi')

      topics?.forEach(topicBase => {
        if (Object.values(topicBase).join(' ').match(searchRegex)) {
          results.push(topicBase)
        }
      })

      return results
    },
    [searchTerm],
  )

  const sortFn = useCallback(
    (a: TopicBase, b: TopicBase) => {
      const now = new Date()
      if (sortDirection === 'ASC') {
        return (
          new Date(a.time ?? now).getTime() - new Date(b.time ?? now).getTime()
        )
      } else {
        return (
          new Date(b.time ?? now).getTime() - new Date(a.time ?? now).getTime()
        )
      }
    },
    [sortDirection],
  )

  useEffect(() => {
    const localeData = data?.data?.filter(d => d.locale === locale) || []

    const filteredData = localeData?.filter(d =>
      filter.length > 0 ? filter.includes(d.publisher) : true,
    )

    const sources = localeData
      ?.map(d => d.publisher)
      .filter((v, i, a) => a.indexOf(v) === i)

    setSources(sources)

    setTopics((searchTerm ? search(filteredData) : filteredData)?.sort(sortFn))
  }, [data, filter, locale, search, searchTerm, sortDirection, sortFn])

  const sortMenu = (
    <MenuOptionGroup
      title="Order by Date"
      type="radio"
      onChange={direction => setSortDirection(direction as 'ASC' | 'DESC')}
      value={sortDirection}
    >
      <MenuItemOption key="asc" icon={<FaArrowUp />} value="ASC">
        Asc
      </MenuItemOption>
      <MenuItemOption key="desc" icon={<FaArrowDown />} value="DESC">
        Desc
      </MenuItemOption>
    </MenuOptionGroup>
  )

  const filterMenu = (
    <MenuOptionGroup
      title="Publishers"
      type="checkbox"
      onChange={value => setFilter(value as string[])}
    >
      {sources?.map(source => (
        <MenuItemOption key={source} value={source}>
          {source}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  const canSync =
    data?.updatedAt && isPast(addHours(new Date(data.updatedAt), 1))

  const syncedStr =
    data?.updatedAt &&
    `Updated ${formatDistanceToNow(new Date(data.updatedAt), {
      addSuffix: true,
    })}`

  const keywords = {
    tr: ['insan haklari', 'işkence', 'adalet', 'özgürlük'],
    en: ['human rights', 'torture', 'justice', 'freedom'],
    nl: ['mensenrechten', 'marteling', 'gerechtigheid', 'vrijheid'],
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        searchPlaceHolder="Search news"
        onSearch={setSearchTerm}
        sortMenu={sortMenu}
        filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
      >
        <Tooltip label={syncedStr} hasArrow bg="primary.400">
          <IconButton
            aria-label="Sync news"
            isLoading={syncTopic.isLoading}
            onClick={() => syncTopic.mutate()}
            isDisabled={!isAdmin && (!canSync || syncTopic.isLoading)}
            icon={<FaSyncAlt />}
          />
        </Tooltip>
      </PageHeader>
      <Box overflow={'hidden'} mb={4}>
        <Box overflowX={'auto'}>
          <ButtonGroup size={'sm'} overflowX={'auto'}>
            <IconButton
              aria-label="Clear filters"
              icon={<AiOutlineClear />}
              size={'sm'}
              variant={searchTerm === '' ? 'solid' : 'outline'}
              onClick={() => setSearchTerm('')}
            />
            {keywords[locale].map(keyword => (
              <Button
                key={keyword}
                onClick={() => setSearchTerm(keyword)}
                variant={searchTerm === keyword ? 'solid' : 'outline'}
              >
                {keyword}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {isLoading ? (
          <Center h="60vh">
            <Spinner size="xl" />
          </Center>
        ) : (
          <>
            {topics?.map((topic, i) => (
              <TopicCard key={topic.url + i} topic={topic} />
            ))}
          </>
        )}
      </SimpleGrid>
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'News',
    tr: 'Haberler',
    nl: 'Nieuws',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default NewsPage
