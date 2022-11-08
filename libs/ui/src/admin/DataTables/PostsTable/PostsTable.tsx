import { FC } from 'react'

import { QueryKey } from '@tanstack/react-query'
import { Post } from '@wsvvrijheid/types'
import { useRouter } from 'next/router'

import { DataTable } from '../DataTable'
import { DataTableProps } from '../types'
import { columns } from './columns'

type PostsTableProps = Omit<DataTableProps<Post>, 'columns'> & {
  queryKey?: QueryKey
}

export const PostsTable: FC<PostsTableProps> = ({
  data: posts,
  totalCount,
  currentPage,
  onSort,
  setCurrentPage,
}) => {
  const router = useRouter()

  const handleClickRow = (index: number, id: number) => {
    router.push(`/posts/${id}`)
  }

  return (
    <DataTable
      data={posts}
      columns={columns}
      totalCount={totalCount}
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      onSort={onSort}
      onClickRow={handleClickRow}
    />
  )
}
