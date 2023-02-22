import { useEffect, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  Blog,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import {
  AdminLayout,
  blogColumns,
  blogFields,
  blogSchema,
  DataTable,
  ModelCreateModal,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const BlogsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const blogsQuery = useSearchModel<Activity>({
    url: 'api/blogs',
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
    blogsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const blogs = blogsQuery?.data?.data
  const totalCount = blogsQuery?.data?.meta?.pagination?.pageCount

  const handleClick = (index: number, id: number) => {
    push(`/blogs/${id}`)
  }

  return (
    <AdminLayout title={`${status} Blogs`}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      >
        <ModelCreateModal<Blog>
          title="Create Blog"
          url="api/blogs"
          schema={blogSchema}
          fields={blogFields}
          onSuccess={() => blogsQuery.refetch()}
          buttonProps={{ mb: 4 }}
        >
          New Blog
        </ModelCreateModal>
      </PageHeader>

      <DataTable
        columns={blogColumns}
        data={blogs}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export default BlogsPage
