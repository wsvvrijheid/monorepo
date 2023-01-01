import { useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Hashtag,
  HashtagCreateInput,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { AdminLayout, DataTable, ModelCreateModal } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'
import * as yup from 'yup'

import { mainHashtagColumns } from '../../data/'

const MainHashtagsPage = () => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    hashtagDefault: yup.string().required('Hashtag is required'),
    hashtagExtra: yup.string(),
    mentions: yup.array().of(
      yup.object().shape({
        label: yup.string(),
        value: yup.string(),
      }),
    ),
  })

  const hashtagsQuery = useSearchModel({
    url: 'api/hashtags',
    sort,
    searchTerm,
    searchFields: ['title', 'description'],
    page: currentPage || 1,
    locale: router.locale as StrapiLocale,
    statuses: ['approved', 'pending', 'rejected'],
  })

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    hashtagsQuery.refetch()
  }, [router.locale, searchTerm, sort])

  const hashtags = hashtagsQuery?.data?.data

  const totalCount = hashtagsQuery?.data?.meta?.pagination?.pageCount
  const hashtagWithLocalizeKeys = hashtags?.map(hashtag => ({
    ...hashtag,
    translates: hashtag.localizations?.map(l => l.locale),
  }))

  const handleRowClick = (index: number, id: number) => {
    router.push(`/hashtags/${id}`)
  }

  return (
    <AdminLayout
      title="Main Hashtag"
      headerProps={{
        onSearch: handleSearch,
      }}
    >
      <ModelCreateModal<Hashtag, HashtagCreateInput>
        url="api/hashtags"
        schema={schema}
        onSuccess={hashtagsQuery.refetch}
        fields={[
          { name: 'title', isRequired: true },
          { name: 'description', isRequired: true, type: 'textarea' },
          { name: 'content', isRequired: true, type: 'textarea' },
          { name: 'hashtagDefault', isRequired: true },
          { name: 'hashtagExtra' },
          { name: 'mentions', type: 'select', isMulti: true, isRequired: true },
        ]}
      >
        Create Hashtag
      </ModelCreateModal>
      <DataTable
        columns={mainHashtagColumns}
        data={hashtagWithLocalizeKeys}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleRowClick}
      />
    </AdminLayout>
  )
}

export default MainHashtagsPage
