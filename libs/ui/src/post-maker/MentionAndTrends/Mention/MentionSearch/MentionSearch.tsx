import { useState } from 'react'

import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react'
import {
  clearSearchedMentions,
  fetchSearchedMentions,
  resetMentions,
  setMentions,
  useAppDispatch,
  useAppSelector,
} from '@wsvvrijheid/utils'
import { useTranslation } from 'react-i18next'
import { FaSearch } from 'react-icons/fa'
import { useDebounce } from 'react-use'

export const MentionSearch = (): JSX.Element => {
  const { mentions } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const [searchArea, setSearchArea] = useState<string>('')

  const [onSearchMention] = useDebounce(() => {
    if (searchArea.length > 1) {
      const filteredData =
        mentions?.filter(m =>
          m.data?.screen_name.toLowerCase().includes(searchArea.toLowerCase()),
        ) ?? []
      dispatch(setMentions(filteredData))
      if (filteredData.length === 0) {
        dispatch(fetchSearchedMentions(searchArea))
      }
    } else {
      dispatch(clearSearchedMentions())
      dispatch(resetMentions())
    }
  }, 600)

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
        placeholder={t`post.search-label`}
        onChange={event => {
          setSearchArea(event.target.value)
          onSearchMention()
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
