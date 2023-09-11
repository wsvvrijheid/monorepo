import { useEffect, useState } from 'react'

import { MenuItem, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { ApprovalStatus, Art, Sort, StrapiLocale } from '@wsvvrijheid/types'
import { AdminLayout, ArtsTable, PageHeader } from '@wsvvrijheid/ui'

const ArtsPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [searchTerm, setSearchTerm] = useState<string>()
  const { t: tModel } = useTranslation('model')

  // Client side query params (?status=pending)
  const status = query.status as ApprovalStatus

  const [sort, setSort] = useState<Sort>()

  const { locale } = useRouter()

  const artsQuery = useStrapiRequest<Art>({
    endpoint: 'arts',
    populate: [
      'artist.user.avatar',
      'categories',
      'image',
      'likers',
      'localizations',
    ],
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(status ? { approvalStatus: { $eq: status } } : {}),
      ...(searchTerm && { [`title_${locale}`]: { $containsi: searchTerm } }),
    },
    sort,
    locale,
  })

  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    artsQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const arts = artsQuery?.data?.data
  const totalCount = artsQuery?.data?.meta?.pagination?.pageCount || 0

  const mappedArts = arts?.map(art => {
    const translates = []

    if (art.title_en) translates.push('en')
    if (art.title_tr) translates.push('tr')
    if (art.title_nl) translates.push('nl')

    return {
      ...art,
      translates,
    }
  }) as Art[]

  return (
    <AdminLayout seo={{ title: tModel('arts') }}>
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
      <ArtsTable
        data={mappedArts}
        onSuccess={artsQuery.refetch}
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

  return {
    props: {
      ...(await ssrTranslations(locale, ['admin', 'model'])),
    },
  }
}

export default ArtsPage
