import { useEffect, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import { AdminLayout, CreateActivityModal, DataTable } from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

import { activityColumns } from '../../data'

const ActivitiesPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

  const [searchTerm, setSearchTerm] = useState<string>()
  const { locale, push } = useRouter()

  const [sort, setSort] = useState<Sort>()
  const queryKey = [
    'activities',
    locale,
    searchTerm,
    sort,
    currentPage || 1,
    status ? [status] : undefined,
  ]
  const activitiesQuery = useSearchModel<Activity>(queryKey, {
    url: 'api/activities',
    page: currentPage || 1,
    pageSize: 10,
    searchTerm,
    sort,
    locale: locale as StrapiLocale,
    statuses: status ? [status] : undefined,
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
    push(`/activities/${id}`)
  }

  return (
    <AdminLayout
      title={`${status} Activities`}
      headerProps={{
        onSearch: handleSearch,
        searchPlaceHolder: 'Search by title or content',
        defaultLocale,
      }}
    >
      <CreateActivityModal queryKey={queryKey} />
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

export default ActivitiesPage
