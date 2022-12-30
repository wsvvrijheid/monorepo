import { useEffect, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { ApprovalStatus, Post, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, CreateActivityModal, DataTable } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

import { postColumns } from '../../data'

const PostsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()
  const queryKey = [
    'posts',
    locale,
    searchTerm,
    sort,
    currentPage || 1,
    status ? [status] : undefined,
  ]
  const postsQuery = useSearchModel<Post>(queryKey, {
    url: 'api/posts',
    page: currentPage || 1,
    pageSize: 10,
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

  useUpdateEffect(() => {
    postsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const posts = postsQuery?.data?.data
  const totalCount = postsQuery?.data?.meta?.pagination?.pageCount

  const mappedPosts = posts?.map(post => ({
    ...post,
    translates: post.localizations?.map(l => l.locale),
  }))

  const handleClick = (index: number, id: number) => {
    push(`/posts/${id}`)
  }

  return (
    <AdminLayout
      title={`${status} Posts`}
      headerProps={{
        onSearch: handleSearch,
        searchPlaceHolder: 'Search by title or content',
        defaultLocale,
      }}
    >
      <CreateActivityModal queryKey={queryKey} />
      <DataTable<Post>
        columns={postColumns}
        data={mappedPosts}
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