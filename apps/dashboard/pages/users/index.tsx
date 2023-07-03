import { FC, useState } from 'react'

import { GetServerSidePropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { NextSeoProps } from 'next-seo'

import { useStrapiRequest } from '@wsvvrijheid/services'
import { ssrTranslations } from '@wsvvrijheid/services/ssrTranslations'
import { Sort, StrapiLocale, User } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  usersColumns,
} from '@wsvvrijheid/ui'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const UsersPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>(1)

  const [q, setQ] = useState<string>()
  const { push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const usersQuery = useStrapiRequest<User>({
    url: 'api/users',
    page: currentPage || 1,
    filters: { name: { $containsi: q } },
    sort,
  })

  const usersData = usersQuery?.data?.data
  const totalCount = usersQuery?.data?.meta?.pagination?.pageCount || 0

  const handleClick = (index: number, id: number) => {
    push(`/users/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={setQ}
        searchPlaceHolder={'Search by title or description'}
      />

      <DataTable<User>
        columns={usersColumns}
        data={usersData || []}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async (context: GetServerSidePropsContext) => {
  const locale = context.locale as StrapiLocale

  const title = {
    en: 'Users',
    tr: 'Kulllanicilar',
    nl: 'Users',
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

export default UsersPage
