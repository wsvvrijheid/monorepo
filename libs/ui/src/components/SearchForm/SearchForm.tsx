import { useState } from 'react'

import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  useUpdateEffect,
} from '@chakra-ui/react'
import { InputProps } from '@chakra-ui/react'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useDebounce } from 'react-use'

/**
 * @param mode "change | click"
 */
export type SearchFormProps = {
  delay?: number
  onSearch: (value?: string) => void
  onReset?: () => void
  mode?: 'change' | 'click'
} & InputProps

export const SearchForm: React.FC<SearchFormProps> = ({
  placeholder,
  delay,
  onSearch,
  onReset,
  mode = 'change',
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm)
    },
    delay || 700,
    [searchTerm],
  )

  // `useUpdateEffect` is used here because we don't need to call `onSearch` at the first render
  // We call `onSearch` only if  mode is `change` and the debouncedSearchTerm's lenght is greater than 2
  useUpdateEffect(() => {
    if (mode === 'change' && debouncedSearchTerm.length > 2) {
      onSearch?.(debouncedSearchTerm)
    }
    if (debouncedSearchTerm === '') {
      onSearch?.()
    }
  }, [debouncedSearchTerm, onSearch, onReset])

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
            aria-label="Clear search"
          />
        )}
        {mode === 'click' && (
          <IconButton
            colorScheme="primary"
            onClick={() => onSearch(searchTerm)}
            icon={<FaSearch />}
            aria-label="Search"
          />
        )}
      </InputRightElement>
    </InputGroup>
  )
}
