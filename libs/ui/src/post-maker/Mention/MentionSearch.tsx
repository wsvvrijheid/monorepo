import { useEffect, useMemo, useState } from 'react'

import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { FaSearch, FaTimes } from 'react-icons/fa'
import { useDebounce } from 'react-use'

import { useHashtagContext } from '@wsvvrijheid/context'

export const MentionSearch = (): JSX.Element => {
  const { t } = useTranslation()
  const [value, setValue] = useState('')
  const { setMentionSearchKey, data } = useHashtagContext()

  const filteredMentions = useMemo(
    () =>
      data?.mentions?.filter(m =>
        m.data?.screen_name.toLowerCase().includes(value.toLowerCase()),
      ) || [],
    [data?.mentions, value],
  )

  useDebounce(
    () => {
      if (filteredMentions.length === 0) {
        setMentionSearchKey(value)
      }
    },
    600,
    [value],
  )

  useEffect(() => {
    if (filteredMentions.length === 0) {
      setMentionSearchKey(value)
    } else {
      setMentionSearchKey('')
    }
  }, [filteredMentions])

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
        placeholder={t('post.search-label') as string}
        onChange={event => {
          setValue(event.target.value)
        }}
        value={value}
        _focusVisible={{
          outline: 'none',
        }}
      />
      <InputRightElement>
        <IconButton
          aria-label={'Clear mention search'}
          onClick={() => setValue('')}
          icon={<FaTimes />}
          variant={'ghost'}
          size={'sm'}
          colorScheme={'blackAlpha'}
        />
      </InputRightElement>
    </InputGroup>
  )
}
