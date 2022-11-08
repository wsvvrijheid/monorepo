import { useState } from 'react'

import { usePostsByFilterAndSort } from '@wsvvrijheid/services'
import { StrapiLocale, Sort } from '@wsvvrijheid/types'
import { AdminLayout, PostsTable } from '@wsvvrijheid/ui'
import { useUpdateEffect } from 'react-use'

const HashtagPostsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>()
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const [locale, setLocale] = useState<StrapiLocale>(defaultLocale)
  const [sort, setSort] = useState<Sort>()
  const queryKey = ['posts', searchTerm, sort, currentPage || 1]

  const PostsQuery = usePostsByFilterAndSort(queryKey, {
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: locale as StrapiLocale,
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

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
      title="HashtagPosts"
      headerProps={{
        onSearch: handleSearch,
        onLanguageSwitch: locale => setLocale(locale),
        defaultLocale,
      }}
    >
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
