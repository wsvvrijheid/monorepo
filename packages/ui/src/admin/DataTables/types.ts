import { ReactNode } from 'react'

import { StrapiModel } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export type DataTableProps<T extends StrapiModel> = {
  totalCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
  children?: ReactNode
} & Pick<WTableProps<T>, 'data' | 'columns' | 'onClickRow' | 'onSort'>
