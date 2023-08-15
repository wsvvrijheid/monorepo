import { FC, useState } from 'react'

import { MenuItem, useUpdateEffect } from '@chakra-ui/react'
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Sort, StrapiLocale, UserFeedback } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  userFeedbacksColumns,
} from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const UserFeedbackPage: FC<PageProps> = ({ seo }) => {
  // const { locale } = useRouter()
  const { push } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [searchTerm, setSearchTerm] = useState<string>()

  const [sort, setSort] = useState<Sort | undefined>(['createdAt:desc'])
  const userFeedbacksQuery = useStrapiRequest<UserFeedback>({
    url: 'api/user-feedbacks',
    page: currentPage || 1,
    pageSize: 10,
    filters: {
      ...(searchTerm && { ['comment']: { $containsi: searchTerm } }),
    },
    sort,
  })
  const feedbacks = userFeedbacksQuery?.data?.data
  const totalCount = userFeedbacksQuery?.data?.meta?.pagination?.pageCount || 0

  console.log('user-feedbacks', userFeedbacksQuery)
  useUpdateEffect(() => {
    userFeedbacksQuery.refetch()
  }, [searchTerm, sort])

  const handleSearch = (search?: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const handleClick = (index: number, id: number) => {
    push(`/userfeedbacks/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        //  filterMenu={filterMenu}
        filterMenuCloseOnSelect={false}
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
        sortMenu={[
          <MenuItem key="asc" icon={<FaArrowUp />}>
            Name Asc
          </MenuItem>,
          <MenuItem key="desc" icon={<FaArrowDown />}>
            Name Desc
          </MenuItem>,
        ]}
      />
      {feedbacks && (
        <DataTable<UserFeedback>
          columns={userFeedbacksColumns}
          data={feedbacks}
          totalCount={totalCount}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onClickRow={handleClick}
          onSort={setSort}
        />
      )}
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'User Feedbacks',
    tr: 'Geri Bildirimler',
    nl: 'Gebruikers Feedbacks',
  }

  const seo: NextSeoProps = {
    title: title[locale],
  }

  return {
    props: {
      seo,
      ...(await ssrTranslations(locale, ['admin'])),
    },
  }
}

export default UserFeedbackPage
