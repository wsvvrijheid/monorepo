import { chakra, Text } from '@chakra-ui/react'

import { usePostSelector } from '@wsvvrijheid/store'

export const PostCharCount = () => {
  const { count, isExceeded } = usePostSelector()

  return (
    <Text
      color="gray.500"
      fontSize="sm"
      data-tour="step-character-limit"
      data-tour-mob="step-character-limit"
    >
      <chakra.span
        {...(isExceeded && {
          color: 'red.400',
          fontWeight: 600,
        })}
      >
        {count}
      </chakra.span>
      /280
    </Text>
  )
}
