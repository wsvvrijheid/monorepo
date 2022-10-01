import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Collection } from '@wsvvrijheid/types'

import { CreateCollectionModal } from '../../CreateCollectionModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type CollectionsTableProps = Omit<DataTableProps<Collection>, 'columns'> & {
  queryKey?: QueryKey
}

export const CollectionsTable: FC<CollectionsTableProps> = ({
  data: collections,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  return (
    <>
      <CreateCollectionModal />
      <DataTable
        data={collections}
        columns={columns}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        onSort={onSort}
      />
    </>
  )
}
