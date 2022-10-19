import { useCallback, useEffect, useState } from 'react'

import { MenuItemOption, MenuOptionGroup, SimpleGrid } from '@chakra-ui/react'
import { dehydrate, QueryClient } from '@tanstack/react-query'
import { StrapiLocale, TopicBase } from '@wsvvrijheid/types'
import { AdminLayout, TopicCard } from '@wsvvrijheid/ui'
import { getTopics, useAuthSelector, useTopic } from '@wsvvrijheid/utils'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import i18nConfig from '../../next-i18next.config'

const NewsPage = () => {
  const { user } = useAuthSelector()
  const { data, isLoading } = useTopic()
  const [sources, setSources] = useState<string[]>([])
  const [filter, setFilter] = useState<string[]>([])
  const [topics, setTopics] = useState<TopicBase[]>([])
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sortDirection, setSortDirection] = useState<'DESC' | 'ASC'>('DESC')

  const defaultLocale: StrapiLocale = 'tr'

  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)

  const search = useCallback(
    (topics: TopicBase[]) => {
      const results = []
      topics?.forEach(topicBase => {
        const searchRegex = new RegExp(searchTerm, 'gi')
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
    const localeData = data?.filter(d => d.locale === locale)
    const filteredData = localeData?.filter(d =>
      filter.length > 0 ? filter.includes(d.publisher) : true,
    )
    setSources([...new Set(localeData?.map(d => d.publisher))])
    setTopics((searchTerm ? search(filteredData) : filteredData)?.sort(sortFn))
  }, [data, filter, locale, search, searchTerm, sortDirection, sortFn])

  const sortMenu = (
    <MenuOptionGroup
      title="Order by Date"
      type="radio"
      onChange={(direction: 'ASC' | 'DESC') => setSortDirection(direction)}
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
      onChange={(value: string[]) => setFilter(value)}
    >
      {sources?.map(source => (
        <MenuItemOption key={source} value={source}>
          {source}
        </MenuItemOption>
      ))}
    </MenuOptionGroup>
  )

  return (
    <AdminLayout
      title="News"
      headerProps={{
        onSearch: setSearchTerm,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
        sortMenu,
        filterMenu,
        filterMenuCloseOnSelect: false,
        searchPlaceHolder: 'Search news',
      }}
    >
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {topics?.map((topic, i) => (
          <TopicCard
            key={topic.url}
            variant="horizontal"
            topic={topic}
            userId={user?.id}
            isLoading={isLoading}
            hideDescription={false}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsPage

export const getStaticProps: GetStaticProps = async context => {
  const { locale } = context
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['topics'],
    queryFn: getTopics,
  })

  const seo = {
    title: {
      en: 'News',
      nl: 'Nieuws',
      tr: 'Haberler',
    },
  }
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
      title: seo.title[locale],
      dehydratedState: dehydrate(queryClient),
    },
  }
}
