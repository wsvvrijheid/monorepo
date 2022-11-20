import { useState } from 'react'

import { usePostsByFilterAndSort } from '@wsvvrijheid/services'
import { StrapiLocale, Sort, ApprovalStatus } from '@wsvvrijheid/types'
import {
  AdminLayout,
  CreateHashtagPostModal,
  PostsTable,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const HashtagPostsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'
  const { query } = useRouter()
  console.log('status', query.status)
  const status = query.status as ApprovalStatus
  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['posts', searchTerm, sort, currentPage || 1, status]

  const PostsQuery = usePostsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
    status,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }
  console.log('postQuery', PostsQuery)
  useUpdateEffect(() => {
    PostsQuery.refetch()
  }, [locale, searchTerm, sort])

  const posts = PostsQuery?.data?.data

  const totalCount = PostsQuery?.data?.meta?.pagination?.pageCount

  const mappedPosts = posts?.map(posts => ({
    ...posts,
    translates: posts?.localizations?.map(l => l.locale),
  }))

  return (
    <AdminLayout
      title="Hashtag Posts"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
      <CreateHashtagPostModal />
      <PostsTable
        data={mappedPosts}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default HashtagPostsPage
