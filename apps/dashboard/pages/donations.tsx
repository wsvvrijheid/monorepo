import { useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Donation, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@wsvvrijheid/ui'

const DonationsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>()

  const { t: tModel } = useTranslation()

  const [sort, setSort] = useState<Sort | undefined>(['createdAt:desc'])

  const { locale } = useRouter()
  const columns = useColumns<Donation>()

  const donationsQuery = useStrapiRequest<Donation>({
    endpoint: 'donates',
    page: currentPage || 1,
    pageSize: 50,
    filters: {
      ...(searchTerm && { email: { $containsi: searchTerm } }),
    },
    sort,
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    donationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const donations = donationsQuery?.data?.data as Donation[]
  const totalCount = donationsQuery?.data?.meta?.pagination?.pageCount || 0

  return (
    <AdminLayout seo={{ title: tModel('donations') }}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search arts by title or artist'}
      />
      <DataTable<Donation>
        columns={columns.donates!}
        data={donations}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default DonationsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}
