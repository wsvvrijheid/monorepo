import {
  AvatarProps,
  BadgeProps,
  TableCellProps,
  TableProps,
  TextProps,
} from '@chakra-ui/react'
import { StrapiModel, StrapiModelKeys } from '@wsvvrijheid/types'

import { FormattedDateProps } from '../FormattedDate'

type CellConfigWithTransform<T extends StrapiModel> = {
  label?: string
  cellProps?: TableCellProps
  transform?: (value: T[keyof T]) => string | number
  sortable?: false // Currently not supported when transform is used
}

type CellConfigWithSort = {
  label?: string
  cellProps?: TableCellProps
  sortable?: boolean
  transform: false // Currently not supported when sort is used
}

type CellConfigCommon<T extends StrapiModel> =
  | {
      type: 'text' // Default
      componentProps?: TextProps | ((value: T[keyof T]) => TextProps)
    }
  | {
      type: 'badge'
      componentProps?: BadgeProps | ((value: T[keyof T]) => BadgeProps)
    }
  | {
      type: 'image' | 'images'
      componentProps?: AvatarProps | ((value: T[keyof T]) => AvatarProps)
    }
  | {
      type: 'date'
      componentProps?:
        | FormattedDateProps
        | ((value: T[keyof T]) => FormattedDateProps)
    }

export type CellConfig<T extends StrapiModel> = CellConfigCommon<T> &
  (CellConfigWithTransform<T> | CellConfigWithSort)

export type WTableCellProps<T extends StrapiModel> = {
  value: T[keyof T]
  // TODO Add specific type for each cell value
  cellConfig: CellConfig<T>
}

export type WTableRowProps<T extends StrapiModel> = {
  model: T
  columns: { [key in keyof T]?: CellConfig<T> }
}

export type WTableProps<T extends StrapiModel> = {
  data: T[]
  columns: WTableRowProps<T>['columns']
  onSort: (key: [`${StrapiModelKeys}:${'asc' | 'desc'}`] | null) => void
} & TableProps
