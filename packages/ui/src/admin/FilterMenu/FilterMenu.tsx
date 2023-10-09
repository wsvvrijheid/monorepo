import { FC, useState } from 'react'

import { MenuDivider } from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'

import { FilterMenuGroup } from './FilterMenuGroup'
import { RelationFilterMenuGroup } from './RelationFilterMenuGroup'
import { FilterOption, FilterMenuProps } from './types'
import { I18nNamespaces } from '../../../@types/i18next'

export const FilterMenu: FC<FilterMenuProps> = ({
  relationFilterOptions = [],
  setRelationFilter,
  filterOptions = [],
  setFilters,
}) => {
  const [selectedFilters, setSelectedFilters] = useState<FilterOption[]>([])
  const { t } = useTranslation()

  const handleChangeFilters = (filters: FilterOption[]) => {
    setSelectedFilters(filters)
    setFilters(filters)
  }

  return (
    <>
      {relationFilterOptions?.map((filter, index) => (
        <RelationFilterMenuGroup
          key={index}
          title={
            filter.label || t(filter.field as keyof I18nNamespaces['common'])
          }
          relationFilter={filter}
          setRelationFilter={setRelationFilter}
        />
      ))}

      {relationFilterOptions?.length > 0 && filterOptions?.length > 0 && (
        <MenuDivider />
      )}

      <FilterMenuGroup
        options={filterOptions}
        filters={selectedFilters}
        setFilters={handleChangeFilters}
      />
    </>
  )
}
