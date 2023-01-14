import { useCallback, useEffect, useState } from 'react'

import {
  IconButton,
  MenuItemOption,
  MenuOptionGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tooltip,
  useDisclosure,
  Button,
  ButtonGroup,
  Box,
} from '@chakra-ui/react'
import { useTopic, useTopicSync } from '@wsvvrijheid/services'
import { Post, TopicBase } from '@wsvvrijheid/types'
import {
  AdminLayout,
  ModelCreateForm,
  postFields,
  postSchema,
  TopicCard,
} from '@wsvvrijheid/ui'
import { addHours, formatDistanceToNow, isPast } from 'date-fns'
import { useRouter } from 'next/router'

import { title } from 'process'

import { AiOutlineClear } from 'react-icons/ai'

import { FaArrowDown, FaArrowUp, FaSyncAlt } from 'react-icons/fa'

const NewsPage = () => {
  const { data } = useTopic()
  const syncTopic = useTopicSync()
  const [sources, setSources] = useState<string[]>([])
  const [filter, setFilter] = useState<string[]>([])
  const [topics, setTopics] = useState<TopicBase[]>([])
  const [topic, setTopic] = useState<TopicBase>()
  const [isNews, setOnNews] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [sortDirection, setSortDirection] = useState<'DESC' | 'ASC'>('DESC')

  const { locale } = useRouter()

  const search = useCallback(
    (topics: TopicBase[]) => {
      const results = []
      const keywords = searchTerm.split(' ')
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
    const localeData = data?.data?.filter(d => d.locale === locale)
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

  const canSync =
    data?.updatedAt && isPast(addHours(new Date(data.updatedAt), 1))

  const syncedStr =
    data?.updatedAt &&
    `Updated ${formatDistanceToNow(new Date(data.updatedAt), {
      addSuffix: true,
    })}`
  const formDisclosure = useDisclosure()
  const handleCreatePost = (data: TopicBase) => {
    setTopic(data)
    setOnNews(true)
    formDisclosure.onOpen()
  }
  const postContent = {
    title: topic?.title,
    description: topic?.description,
    reference: topic?.url,
    image: {
      url: topic.image,
    },
  } as Post
  const handleSuccess = () => {
    formDisclosure.onClose()
    setOnNews(false)
  }
  const keywords = {
    tr: ['insan haklari', 'işkence', 'adalet', 'özgürlük'],
    en: ['human rights', 'torture', 'justice', 'freedom'],
    nl: ['mensenrechten', 'marteling', 'gerechtigheid', 'vrijheid'],
  }

  return (
    <AdminLayout
      title="News"
      headerProps={{
        onSearch: setSearchTerm,
        sortMenu,
        filterMenu,
        filterMenuCloseOnSelect: false,
        searchPlaceHolder: 'Search news',
        children: (
          <Tooltip label={syncedStr} hasArrow bg="primary.400">
            <IconButton
              aria-label="Sync news"
              isLoading={syncTopic.isLoading}
              onClick={() => syncTopic.mutate()}
              disabled={!canSync}
              colorScheme={'primary'}
              icon={<FaSyncAlt />}
            />
          </Tooltip>
        ),
      }}
    >
      {isNews && (
        <Modal
          isCentered
          closeOnOverlayClick={true}
          isOpen={formDisclosure.isOpen}
          onClose={formDisclosure.onClose}
          size="6xl"
          scrollBehavior="inside"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader color={'primary.500'}>{title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody pos="relative" py={6}>
              <ModelCreateForm<Post>
                url="api/posts"
                schema={postSchema}
                fields={postFields}
                model={postContent}
                isField={true}
                onSuccess={handleSuccess}
              />
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
      <Box overflow={'hidden'} mb={4}>
        <Box overflowX={'auto'}>
          <ButtonGroup size={'sm'} overflowX={'auto'}>
            <IconButton
              aria-label="Clear filters"
              icon={<AiOutlineClear />}
              size={'sm'}
              colorScheme={'primary'}
              variant={searchTerm === '' ? 'solid' : 'outline'}
              onClick={() => setSearchTerm('')}
            />
            {keywords[locale].map(keyword => (
              <Button
                key={keyword}
                onClick={() => setSearchTerm(keyword)}
                colorScheme={'primary'}
                variant={searchTerm === keyword ? 'solid' : 'outline'}
              >
                {keyword}
              </Button>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
      <SimpleGrid columns={{ base: 1 }} gap={4}>
        {topics?.map((topic, i) => (
          <TopicCard
            key={topic.url + i}
            topic={topic}
            onCreatePost={handleCreatePost}
          />
        ))}
      </SimpleGrid>
    </AdminLayout>
  )
}

export default NewsPage
