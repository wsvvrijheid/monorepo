import { FC, useEffect, useRef } from 'react'

import {
  Divider,
  HStack,
  IconButton,
  Spinner,
  Stack,
  Text,
  useCheckboxGroup,
} from '@chakra-ui/react'
import { Category, StrapiLocale } from '@wsvvrijheid/types'
import { RiFilterOffLine } from 'react-icons/ri'
import { useDebounce } from 'react-use'

import { CategoryFilterCheckbox } from './CategoryFilterCheckbox'

export interface CategoryFilterProps {
  categoryData: Partial<Category>[]
  debounce?: number
  initialCategories?: string[]
  isLoading: boolean
  locale: StrapiLocale
  title: string
  selectCategories: (categories: string[]) => void
  setIsLoading: (isLoading: boolean) => void
}

export const CategoryFilter: FC<CategoryFilterProps> = ({
  categoryData = [],
  debounce = 1000,
  initialCategories = [],
  isLoading,
  locale,
  title,
  selectCategories,
  setIsLoading,
}) => {
  const initialCategorySelected = useRef(false)

  const initialCategoriesQuery = initialCategories
    ?.map((category, index) => `${index}=${category}`)
    .join('&')

  const { value, getCheckboxProps, setValue } = useCheckboxGroup({
    defaultValue: initialCategories,
  })

  useEffect(() => {
    if (initialCategoriesQuery && !initialCategorySelected.current) {
      initialCategorySelected.current = true
      const categoriesQuery = initialCategoriesQuery
        .split('&')
        .map(c => c.split('=')[1])
      setIsLoading(true)
      setValue(categoriesQuery)
    }
  }, [initialCategoriesQuery, setValue, setIsLoading])

  useEffect(() => {
    setIsLoading(true)
  }, [value, setIsLoading])

  useDebounce(
    () => {
      setIsLoading(false)
      selectCategories(value as string[])
    },
    debounce,
    [value],
  )

  return (
    <Stack justify="stretch" w="full" spacing={1}>
      <HStack py={1.5} w="full" justify="space-between" align="center">
        <Text fontWeight="semibold">{title}</Text>
        {isLoading ? (
          <Spinner size="lg" color="primary.500" />
        ) : (
          <IconButton
            isDisabled={!value[0]}
            colorScheme="primary"
            aria-label="clear filter"
            rounded="full"
            size="sm"
            icon={<RiFilterOffLine />}
            onClick={() => setValue([])}
          />
        )}
      </HStack>
      <Divider />
      {categoryData?.map(category => (
        <CategoryFilterCheckbox
          key={category.id}
          {...getCheckboxProps({
            id: category.id,
            value: category.slug,
            name: category[`name_${locale}`],
          })}
        />
      ))}
    </Stack>
  )
}
