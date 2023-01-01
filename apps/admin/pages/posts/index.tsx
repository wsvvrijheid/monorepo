import { useEffect, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  ApprovalStatus,
  Post,
  PostCreateInput,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { AdminLayout, ModelCreateModal, DataTable } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'
import * as yup from 'yup'

import { postColumns } from '../../data'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string(),
  hashtag: yup.object().required('Hashtag is required'),
  image: yup.mixed().required('Image is required'),
  reference: yup.string(),
})

const PostsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

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
      <ModelCreateModal<Post, PostCreateInput>
        url="api/posts"
        schema={schema}
        fields={[
          {
            name: 'title',
            isRequired: true,
          },
          {
            name: 'reference',
          },
          {
            name: 'description',
            isRequired: true,
            type: 'textarea',
          },
          {
            name: 'content',
            type: 'textarea',
          },
          {
            name: 'hashtag',
            isRequired: true,
            type: 'select',
            url: 'api/hashtags',
          },
          {
            name: 'image',
            type: 'file',
            isRequired: true,
          },
        ]}
        onSuccess={() => postsQuery.refetch()}
      >
        Create Post
      </ModelCreateModal>
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
