import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Activity } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type ActivityTableProps = Omit<DataTableProps<Activity>, 'columns'> & {
  queryKey?: QueryKey
}

export const ActivityTable: FC<ActivityTableProps> = ({
  data: activities,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const router = useRouter()

  const handleClickRow = (index: number, id: number) => {
    router.push(`/activity/${id}`)
  }

  return (
    <DataTable
      data={activities}
      columns={columns}
      onClickRow={handleClickRow}
      totalCount={totalCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSort={onSort}
    />
  )
}
