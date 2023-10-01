import { useEffect, useState } from 'react'

import { useUpdateEffect, Box, Text, Flex } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Donation, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { MonthPicker } from '@wsvvrijheid/ui'
import { AdminLayout, DataTable, PageHeader, useColumns } from '@wsvvrijheid/ui'
import { RangeParams } from '@wsvvrijheid/ui/src/components/MonthPicker/types'

const DonationsPage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(50)
  const [searchTerm, setSearchTerm] = useState<string>()
  const [date, setDate] = useState<RangeParams>()

  const { t } = useTranslation()

  const [sort, setSort] = useState<Sort | undefined>(['createdAt:desc'])

  const { locale } = useRouter()
  const columns = useColumns<Donation>()

  const startDate =
    date && new Date(date.startYear, date.startMonth).toISOString()

  const endDate = date && new Date(date.endYear, date.endMonth).toISOString()

  const donationsQuery = useStrapiRequest<Donation>({
    endpoint: 'donates',
    page: currentPage || 1,
    pageSize,
    filters: {
      ...(searchTerm && { email: { $containsi: searchTerm } }),
      ...(date && {
        createdAt: {
          $gte: startDate,
          $lt: endDate,
        },
      }),
      status: { $eq: 'paid' },
    },
    sort,
  })

  useEffect(() => setCurrentPage(1), [])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const handleSelect = (selectedDate?: RangeParams) => {
    selectedDate ? setDate(selectedDate) : setDate(undefined)
  }

  const handleClear = () => {
    setDate(undefined)
  }

  useUpdateEffect(() => {
    donationsQuery.refetch()
  }, [locale, searchTerm, sort])

  const donations = donationsQuery?.data?.data as Donation[]


  const totalAmount =
    donations &&
    donations.reduce((acc, donation) => {
      return acc + (donation.amount || 0)
    }, 0)

  const pageCount = donationsQuery?.data?.meta?.pagination?.pageCount || 0
  const totalCount = donationsQuery?.data?.meta?.pagination?.total || 0


  return (
    <AdminLayout seo={{ title: t('donations') }}>
      <PageHeader onSearch={handleSearch}>
        <MonthPicker onClear={handleClear} onRangeSelect={handleSelect} />
      </PageHeader>

      <DataTable<Donation>
        columns={columns.donates!}
        currentPage={currentPage}
        data={donations}
        onSort={setSort}
        pageCount={pageCount}
        pageSize={pageSize}
        setCurrentPage={setCurrentPage}
        setPageSize={setPageSize}
        totalCount={totalCount as number}
      >
        {donations && (
          <Flex justify={'end'}>
            <Box paddingY={2} paddingX={5} bg="white" shadow="base">
              Total Paid: <Text as="b">{totalAmount}</Text>
            </Box>
          </Flex>
        )}
      </DataTable>
    </AdminLayout>
  )
}

export default DonationsPage

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  return {
    props: {
      ...(await ssrTranslations(locale)),
    },
  }
}
