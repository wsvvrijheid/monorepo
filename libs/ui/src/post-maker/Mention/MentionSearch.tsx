import { useEffect, useState } from 'react'

import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {
  clearSearchedMentions,
  fetchSearchedMentions,
  resetMentions,
  setMentions,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/utils'
import { useTranslation } from 'next-i18next'
import { FaSearch } from 'react-icons/fa'
import { useDebounce } from 'react-use'

export const MentionSearch = (): JSX.Element => {
  const { mentions } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [searchArea, setSearchArea] = useState<string>('')
  const [debouncedSearchArea, setDebouncedSearchArea] = useState<string>('')

  useDebounce(
    () => {
      setDebouncedSearchArea(searchArea)
    },
    600,
    [searchArea],
  )

  useEffect(() => {
    if (debouncedSearchArea.length > 1) {
      const filteredData =
        mentions?.filter(m =>
          m.data?.screen_name
            .toLowerCase()
            .includes(debouncedSearchArea.toLowerCase()),
        ) ?? []
      dispatch(setMentions(filteredData))
      if (filteredData.length === 0) {
        dispatch(fetchSearchedMentions(debouncedSearchArea))
      }
    } else {
      dispatch(clearSearchedMentions())
      dispatch(resetMentions())
    }
  }, [debouncedSearchArea, dispatch, mentions])

  return (
    <InputGroup data-tour="step-search">
      <InputLeftElement pointerEvents="none">
        <Box color="gray.300" as={FaSearch} />
      </InputLeftElement>
      <Input
        bg="white"
        borderWidth={0}
        borderBottomWidth={2}
        rounded={0}
        id="mention-search"
        placeholder={t('post.search-label')}
        onChange={event => {
          setSearchArea(event.target.value)
        }}
        value={searchArea}
        _focus={{
          borderBottomWidth: 2,
          borderBottomColor: 'gray.300',
        }}
      />
    </InputGroup>
  )
}
