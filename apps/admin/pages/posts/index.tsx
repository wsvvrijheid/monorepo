import { useEffect, useState } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import { ApprovalStatus, Post, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelCreateModal,
  postColumns,
  postFields,
  postSchema,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const PostsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()
  const [posts, setPosts] = useState<Post[]>([])

  const [sources, setSources] = useState<string[]>([])
  const [filters, setFilter] = useState<string[]>([])

  const postsQuery = useSearchModel<Post>({
    url: 'api/posts',
    page: currentPage || 1,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: status ? [status] : undefined,
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const postsData = postsQuery?.data?.data
  const totalCount = postsQuery?.data?.meta?.pagination?.pageCount

  const mappedPosts = postsData?.map(post => ({
    ...post,
    translates: post.localizations?.map(l => l.locale),
  }))
  useUpdateEffect(() => {
    postsQuery.refetch()
    setPosts(mappedPosts)
  }, [locale, searchTerm, sort, status])

  useEffect(() => {
    const localeData = postsQuery?.data?.data?.filter(d => d.locale === locale)

    const filteredData = localeData?.filter(d =>
      filters.length > 0 ? filters.includes(d?.hashtag?.title) : true,
    )
    console.log('filtered data', filteredData)
    setSources([...new Set(localeData?.map(d => d.hashtag.title))])
    //  setPosts(searchTerm ? handleSearch(filteredData) : filteredData)
  }, [filters, locale, handleSearch, searchTerm])

  const filterMenu = (
    <MenuOptionGroup
      title="Hastags"
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

  const handleClick = (index: number, id: number) => {
    push(`/posts/${id}`)
  }

  return (
    <AdminLayout
      title={`${status} Posts`}
      headerProps={{
        filterMenu,
        filterMenuCloseOnSelect: false,
        onSearch: handleSearch,
        searchPlaceHolder: 'Search by title or content',
        defaultLocale,
      }}
    >
      <ModelCreateModal<Post>
        title="Create Post"
        url="api/posts"
        schema={postSchema}
        fields={postFields}
        onSuccess={postsQuery.refetch}
      >
        Create Post
      </ModelCreateModal>
      <DataTable<Post>
        columns={postColumns}
        data={posts}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export default PostsPage
