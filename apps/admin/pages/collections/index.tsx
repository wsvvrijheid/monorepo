import { useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Collection, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DataTable, ModelCreateModal } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'
import * as yup from 'yup'

import { collectionColumns } from '../../data'

const CollectionsPage = () => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

  const schema = yup.object({
    title: yup.string().required('Title is required'),
    description: yup.string().required('Description is required'),
    content: yup.string().required('Content is required'),
    image: yup.mixed(),
  })

  const collectionsQuery = useSearchModel<Collection>({
    url: 'api/collections',
    sort,
    searchTerm,
    page: currentPage || 1,
    locale: router.locale as StrapiLocale,
    statuses: ['approved', 'pending', 'rejected'],
  })
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    collectionsQuery.refetch()
  }, [router.locale, searchTerm, sort])

  const collections = collectionsQuery?.data?.data
  const totalCount = collectionsQuery?.data?.meta.pagination.total

  const mappedCollections = collections?.map(collection => ({
    ...collection,
    translates: collection.localizations?.map(l => l.locale),
  }))

  const handleRowClick = (index: number, id: number) => {
    router.push(`/collections/${id}`)
  }

  return (
    <AdminLayout
      title="Collections"
      headerProps={{
        onSearch: handleSearch,
        defaultLocale: router.defaultLocale as StrapiLocale,
      }}
    >
      <ModelCreateModal
        url="api/collections"
        schema={schema}
        fields={[
          { name: 'title', isRequired: true },
          { name: 'description', isRequired: true, type: 'textarea' },
          { name: 'content', isRequired: true, type: 'textarea' },
          { name: 'image', isRequired: true, type: 'file' },
        ]}
        onSuccess={collectionsQuery.refetch}
      >
        Create Collection
      </ModelCreateModal>
      <DataTable
        columns={collectionColumns}
        data={mappedCollections}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleRowClick}
      />
    </AdminLayout>
  )
}

export default CollectionsPage
