import { StrapiModel } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export type DataTableProps<T extends StrapiModel> = {
  pageCount: number
  totalCount: number
  currentPage: number
  pageSize: number
  setCurrentPage: (page: number) => void
  setPageSize: (pageSize: number) => void
} & Pick<WTableProps<T>, 'data' | 'columns' | 'onClickRow' | 'onSort'>
