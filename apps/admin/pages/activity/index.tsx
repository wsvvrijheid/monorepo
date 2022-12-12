import { useEffect, useState } from 'react'

import { useActivitiesByFilterAndSort } from '@wsvvrijheid/services'
import { ApprovalStatus, Sort, StrapiLocale } from '@wsvvrijheid/types'
import {
  ActivityTable,
  AdminLayout,
  CreateActivityModal,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const ActivityPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale } = useRouter()

  const [sort, setSort] = useState<Sort>()
  const queryKey = [
    'activities',
    locale,
    searchTerm,
    sort,
    currentPage || 1,
    status,
  ]
  const activitiesQuery = useActivitiesByFilterAndSort(queryKey, {
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    status,
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

  const mappedactivities = activities?.map(activity => ({
    ...activity,
    translates: activity.localizations?.map(l => l.locale),
  }))

  return (
    <AdminLayout
      title={`${status} Activities`}
      headerProps={{
        onSearch: handleSearch,
        searchPlaceHolder: 'Search by title or content',
        defaultLocale,
      }}
    >
      <CreateActivityModal />
      <ActivityTable
        data={mappedactivities}
        queryKey={queryKey}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={setSort}
      />
    </AdminLayout>
  )
}

export default ActivityPage
