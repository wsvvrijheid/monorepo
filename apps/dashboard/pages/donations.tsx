import { FC, useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Donation, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { MonthPicker } from '@wsvvrijheid/ui'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>
type Month = {
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
}

const DonationsPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [month, setMonth] = useState<Month>()

  const [sort, setSort] = useState<Sort | undefined>(['createdAt:desc'])

  const { locale } = useRouter()
  const columns = useColumns<Donation>()

  const donationsQuery = useStrapiRequest<Donation>({
    endpoint: 'donates',
    page: currentPage || 1,
    pageSize: 50,
    filters: {
      ...(searchTerm && { email: { $containsi: searchTerm } }),
      ...(month && {
        createdAt: {
          $gte: `${month?.startYear}-${month?.startMonth
            .toString()
            .padStart(2, '0')}-01T00:00:00.000Z`,
          $lte: `${month?.endYear}-${month?.endMonth
            .toString()
            .padStart(2, '0')}-01T00:00:00.000Z`,
        },
      }),
    },
    sort,
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const handleSelect = (selectedDate?: Month) => {
    selectedDate ? setMonth(selectedDate) : setMonth(undefined)
  }

  useUpdateEffect(() => {
    donationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const donations = donationsQuery?.data?.data as Donation[]
  const totalCount = donationsQuery?.data?.meta?.pagination?.pageCount || 0

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search arts by title or artist'}
      />
      <MonthPicker onRangeSelect={handleSelect} />
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Donations',
    tr: 'Bağışlar',
    nl: 'Donaties',
  }

  const seo = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default DonationsPage
