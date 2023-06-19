import { FC, useEffect, useMemo, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import { Sort, User, Volunteer } from '@wsvvrijheid/types'
import {
  AdminLayout,
  DataTable,
  PageHeader,
  usersColumns,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const UsersPage: FC<PageProps> = ({ seo }) => {
  const [currentPage, setCurrentPage] = useState<number>()

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const usersQuery = useSearchModel<User>({
    url: 'api/users',
    page: currentPage || 1,
    searchTerm,
    sort,
  })

  console.log('users', usersQuery?.data?.data)

  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  const usersData = usersQuery?.data?.data
  const totalCount = usersQuery?.data?.meta?.pagination?.pageCount

  useUpdateEffect(() => {
    usersQuery.refetch()
  }, [locale, searchTerm, sort])

  const handleClick = (index: number, id: number) => {
    push(`/users/${id}`)
  }

  return (
    <AdminLayout seo={seo} >
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      />
      <DataTable<User>
        columns={usersColumns}
        data={usersData}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
        onClickRow={handleClick}
      />
    </AdminLayout>
  )
}

export const getStaticProps = async context => {
  const { locale } = context

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
      ...(await serverSideTranslations(
        locale,
        ['common', 'admin'],
        i18nConfig,
      )),
    },
  }
}

export default UsersPage
