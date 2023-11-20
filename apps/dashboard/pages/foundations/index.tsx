import { useEffect, useState } from 'react'

import { useDisclosure, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Foundation, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  ModelEditModal,
  PageHeader,
  useColumns,
} from '@wsvvrijheid/ui'

const FoundationsPage = () => {
  const { locale, query, push } = useRouter()
  const selectedId = query.id ? parseInt(query.id as string) : undefined
  const sort = query.sort as Sort
  const currentPage = query.page ? parseInt(query.page as string) : 1
  const pageSize = query.pageSize ? parseInt(query.pageSize as string) : 20

  const [searchTerm, setSearchTerm] = useState<string>()
  const { isOpen, onClose, onOpen } = useDisclosure()

  const columns = useColumns<Foundation>()

  const foundationsQuery = useStrapiRequest<Foundation>({
    endpoint: 'foundations',
    populate: ['assets', 'platforms', 'volunteers', 'profile'],
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    foundationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const foundations = foundationsQuery?.data?.data
  const pageCount = foundationsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = foundationsQuery?.data?.meta?.pagination?.total || 0

  console.log('foundations', foundations)

  const changeRoute = (
    key: 'id' | 'page' | 'sort' | 'status' | 'published' | 'q' | 'pageSize',
    value?: string | number | Sort,
  ) => {
    if (
      !value ||
      (key === 'page' && value === 1) ||
      (key === 'status' && value === 'all') ||
      (key === 'published' && value === 'all') ||
      (key === 'pageSize' && value === 20)
    ) {
      const _query = { ...query }
      delete _query[key]
      push({ query: _query }, undefined, { shallow: true })

      return
    }

    push({ query: { ...query, [key]: value } }, undefined, { shallow: true })
  }
  const setSelectedId = (id?: number) => changeRoute('id', id)
  const setCurrentPage = (page?: number) => changeRoute('page', page)
  const setPageSize = (size?: number) => changeRoute('pageSize', size)
  const setSort = (sort?: Sort) => changeRoute('sort', sort)

  const handleClick = (index: number, id: number) => {
    setSelectedId(id)
  }
  const handleClose = () => {
    setSelectedId(undefined)
    onClose()
  }

  useEffect(() => setCurrentPage(1), [])

  useEffect(() => {
    if (selectedId) {
      onOpen()
    }
  }, [selectedId])

  return (
    <AdminLayout seo={{ title: 'Foundation' }}>
      <PageHeader onSearch={handleSearch} />
      {selectedId && (
        <ModelEditModal<Foundation>
          title={'Foundation'}
          endpoint="foundations"
          id={selectedId}
          isOpen={isOpen}
          onClose={handleClose}
          onSuccess={foundationsQuery.refetch()}
          size={'5xl'}
        />
      )}

      <DataTable<Foundation>
        columns={columns.foundations!}
        currentPage={currentPage}
        data={foundations as Foundation[]}
        onClickRow={handleClick}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}

export default FoundationsPage
