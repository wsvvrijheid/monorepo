import { useEffect, useMemo, useState } from 'react'

import { MenuItemOption, MenuOptionGroup } from '@chakra-ui/react'
import { useSearchModel } from '@wsvvrijheid/services'
import {
  ApprovalStatus,
  Hashtag,
  Post,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
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

  const [hashtagsFilter, setHashtagsFilter] = useState<number[]>([])

  const postsQuery = useSearchModel<Post>({
    url: 'api/posts',
    page: currentPage || 1,
    searchTerm,
    relationFilter: {
      parent: 'hashtag',
      ids: hashtagsFilter,
    },
    sort,
    locale: locale as StrapiLocale,
    statuses: status ? [status] : undefined,
    publicationState: 'preview',
  })

  const hashtagsQuery = useSearchModel<Hashtag>({
    url: 'api/hashtags',
    locale: locale as StrapiLocale,
    publicationState: 'preview',
    fields: ['id', 'title'],
  })

  useEffect(() => setCurrentPage(1), [status, hashtagsFilter])

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const postsData = postsQuery?.data?.data
  const totalCount = postsQuery?.data?.meta?.pagination?.pageCount

  const posts = useMemo(
    () =>
      postsData?.map(post => ({
        ...post,
        translates: post.localizations?.map(l => l.locale),
      })),
    [postsData],
  )

  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [locale, searchTerm, sort, status, hashtagsFilter])

  const filterMenu = (
    <MenuOptionGroup
      title="Hastags"
      type="checkbox"
      onChange={(value: string[]) => setHashtagsFilter(value.map(v => +v))}
    >
      {hashtagsQuery.data?.data?.map(hashtag => (
        <MenuItemOption key={hashtag.id} value={`${hashtag.id}`}>
          {hashtag.title}
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
