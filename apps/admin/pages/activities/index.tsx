import { useEffect, useState } from 'react'

import { useSearchModel } from '@wsvvrijheid/services'
import {
  Activity,
  ApprovalStatus,
  Sort,
  StrapiLocale,
} from '@wsvvrijheid/types'
import {
  activityColumns,
  activityFields,
  activitySchema,
  AdminLayout,
  DataTable,
  ModelCreateModal,
} from '@wsvvrijheid/ui'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'

const ActivitiesPage = () => {
  const { query } = useRouter()
  const [currentPage, setCurrentPage] = useState<number>()
  const status = query.status as ApprovalStatus
  const defaultLocale: StrapiLocale = 'en'

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
      <ModelCreateModal<Activity>
        title="Create Activity"
        url="api/activities"
        schema={activitySchema}
        fields={activityFields}
        onSuccess={() => activitiesQuery.refetch()}
        buttonProps={{ mb: 4 }}
      >
        Create Activity
      </ModelCreateModal>
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
