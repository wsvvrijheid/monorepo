import { StrapiModel } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export type DataTableProps<T extends StrapiModel> = {
  totalCount: number
  currentPage: number
  setCurrentPage: (page: number) => void
} & Pick<WTableProps<T>, 'data' | 'columns' | 'onClickRow' | 'onSort'>

export type TranslateDataTableProps = {
  searchTerm?: string
}
