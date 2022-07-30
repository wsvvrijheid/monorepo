import { useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useUpdateEffect,
} from '@chakra-ui/react'
import { FaSearch, FaTimes } from 'react-icons/fa'

import { useDebounce } from '../../hooks'
import { SearchFormProps } from './types'

/**
 * @param mode "change | click"
 */
export const SearchForm: React.FC<SearchFormProps> = ({
  placeholder,
  delay,
  onSearch,
  onReset,
  mode = 'change',
}) => {
  const [searchTerm, setSearchTerm] = useState('')

  const debouncedSearchTerm = useDebounce(searchTerm, delay || 700)

  // `useUpdateEffect` is used here because we don't need to call `onSearch` at the first render
  // We call `onSearch` only if  mode is `change` and the debouncedSearchTerm's lenght is greater than 2
  useUpdateEffect(() => {
    if (mode === 'change' && debouncedSearchTerm.length > 2)
      onSearch?.(debouncedSearchTerm)
  }, [debouncedSearchTerm, onSearch])

  // `useUpdateEffect` is used here because we don't need to call `onSearch` at the first render
  useUpdateEffect(() => {
    // In any case user clears the search term, we call `onSearch` with an empty string
    if (searchTerm === '') onSearch?.()
  }, [searchTerm, onReset])

  return (
    <InputGroup size="lg" flex="1">
      <InputLeftElement pointerEvents="none">
        {<FaSearch color="gray.400" />}
      </InputLeftElement>
      <Input
        placeholder={placeholder}
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <InputRightElement w="max-content" right={1}>
        {searchTerm.length > 1 && (
          <IconButton
            variant="ghost"
            icon={<FaTimes color="gray.400" />}
            onClick={() => setSearchTerm('')}
            aria-label={''}
          />
        )}
        {mode === 'click' && (
          <IconButton
            colorScheme="blue"
            onClick={() => onSearch(searchTerm)}
            icon={<FaSearch />}
            aria-label={''}
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}
