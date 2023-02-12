import { useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import { Collection, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  collectionColumns,
  collectionFields,
  collectionSchema,
  DataTable,
  ModelCreateModal,
  PageHeader,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const CollectionsPage = () => {
  const [sort, setSort] = useState<Sort>()
  const [currentPage, setCurrentPage] = useState<number>()
  const [searchTerm, setSearchTerm] = useState<string>()
  const router = useRouter()

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
    <AdminLayout title="Collections">
      <PageHeader onSearch={handleSearch}>
        <ModelCreateModal<Collection>
          title="Create Collection"
          url="api/collections"
          schema={collectionSchema}
          fields={collectionFields}
          onSuccess={collectionsQuery.refetch}
          buttonProps={{ mb: 4 }}
        >
          New Collection
        </ModelCreateModal>
      </PageHeader>

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
