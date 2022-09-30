import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Collection, SessionUser } from '@wsvvrijheid/types'

import { CreateCollectionModal } from '../../CreateCollectionModal'
import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type CollectionsTableProps = Omit<DataTableProps<Collection>, 'columns'> & {
  user: SessionUser
  queryKey?: QueryKey
}

export const CollectionsTable: FC<CollectionsTableProps> = ({
  data: collections,
  user,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  return (
    <>
      {user && <CreateCollectionModal />}
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
