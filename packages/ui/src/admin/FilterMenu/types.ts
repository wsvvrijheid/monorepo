import { MenuOptionGroupProps } from '@chakra-ui/react'

import { RequestCollectionArgs } from '@wsvvrijheid/lib'
import { StrapiCollectionEndpoint, StrapiModelKeys } from '@wsvvrijheid/types'

export type FilterOption = {
  field: StrapiModelKeys
  label: string
  operator:
    | '$eq'
    | '$eqi'
    | '$ne'
    | '$nei'
    | '$lt'
    | '$lte'
    | '$gt'
    | '$gte'
    | '$in'
    | '$notIn'
    | '$contains'
    | '$notContains'
    | '$containsi'
    | '$notContainsi'
    | '$null'
    | '$notNull'
    | '$between'
    | '$startsWith'
    | '$startsWithi'
    | '$endsWith'
    | '$endsWithi'
    | '$or'
    | '$and'
    | '$not'
}

export type RelationFilterArgs = {
  endpoint: StrapiCollectionEndpoint
  field: StrapiModelKeys
  ids: number[]
}

export type RelationFilterOption = {
  endpoint: StrapiCollectionEndpoint
  field: StrapiModelKeys
  label?: string
  queryFilters?: RequestCollectionArgs['filters']
}

export type FilterMenuProps = {
  filterOptions?: FilterOption[]
  relationFilterOptions?: RelationFilterOption[]
  setRelationFilter: (args: RelationFilterArgs) => void
  setFilters: (filters: FilterOption[]) => void
}

export type RelationFilterMenuGroupProps = MenuOptionGroupProps & {
  relationFilter: RelationFilterOption
  setRelationFilter: (args: RelationFilterArgs) => void
}

export type FilterMenuGroupProps = MenuOptionGroupProps & {
  options: FilterOption[]
  filters: FilterOption[]
  setFilters: (filters: FilterOption[]) => void
}
