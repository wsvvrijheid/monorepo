import { FC, useEffect, useState } from 'react'

import { useUpdateEffect } from '@chakra-ui/react'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { NextSeoProps } from 'next-seo'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import {
  activityColumns,
  AdminLayout,
  DataTable,
  PageHeader,
} from '@wsvvrijheid/ui'

import i18nConfig from '../../../next-i18next.config'

type PageProps = InferGetStaticPropsType<typeof getStaticProps>

const ActivitiesTranslatePage: FC<PageProps> = ({ seo }) => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()

  const activitiesQuery = useSearchModel<Activity>({
    url: 'api/activities',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: ['pending'],
    publicationState: 'preview',
  })

  useEffect(() => setCurrentPage(1), [status])
  const handleSearch = (search: string) => {
    search ? setSearchTerm(search) : setSearchTerm(undefined)
  }

  useUpdateEffect(() => {
    activitiesQuery.refetch()
  }, [locale, searchTerm, sort, status])

  const activities = activitiesQuery?.data?.data
  const totalCount = activitiesQuery?.data?.meta?.pagination?.pageCount

  const mappedActivities = activities?.map(activity => ({
    ...activity,
    translates: activity.localizations?.map(l => l.locale),
  }))

  const handleClick = (index: number, id: number) => {
    push(`/translates/activities/${id}`)
  }

  return (
    <AdminLayout seo={seo}>
      <PageHeader
        onSearch={handleSearch}
        searchPlaceHolder={'Search by title or description'}
      ></PageHeader>

      <DataTable
        columns={activityColumns}
        data={mappedActivities}
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
    en: 'Activities',
    tr: 'Aktiviteler',
    nl: 'Activiteiten',
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

export default ActivitiesTranslatePage
