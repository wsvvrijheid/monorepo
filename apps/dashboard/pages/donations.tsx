import { FC, useEffect, useState } from 'react'

import { MenuItem, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { ApprovalStatus, Donation, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, DataTable, PageHeader, donationColumns } from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const DonationsPage: FC<PageProps> = ({ seo }) => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>()

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus

  const [sort, setSort] = useState<Sort>()

  const { locale } = useRouter()

  const donationsQuery = useStrapiRequest<Donation>({
    url: 'api/donates',
    page: currentPage || 1,
    pageSize: 10,
    // filters: {
    //   ...(status ? { approvalStatus: { $eq: status } } : {}),
    //   ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    // },
    sort,
    // locale,
  })

  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    donationsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const donations = donationsQuery?.data?.data
  const totalCount = donationsQuery?.data?.meta?.pagination?.pageCount || 0

  const mappedDonations = donations?.map(donation => {

    return {
      ...donation,
    }
  }) as Donation[]

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search arts by title or artist'}
        sortMenu={[
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ]}
      />
      <DataTable
        columns={donationColumns}
        data={mappedDonations}
        // onSuccess={artsQuery.refetch}
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
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default DonationsPage
