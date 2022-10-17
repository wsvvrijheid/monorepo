import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Hashtag } from '@wsvvrijheid/types'
// import { useRouter } from 'next/router'

import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type MainHashtagTableProps = Omit<DataTableProps<Hashtag>, 'columns'> & {
  queryKey?: QueryKey
}

export const MainHashtagTable: FC<MainHashtagTableProps> = ({
  data: mainHashtag,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  // const router = useRouter()

  const handleClickRow = (index: number, id: number) => {
    // router.push(`/hashtag/main/${id}`)
  }

  return (
    <DataTable
      data={mainHashtag}
      columns={columns}
      totalCount={totalCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSort={onSort}
      onClickRow={handleClickRow}
    />
  )
}
