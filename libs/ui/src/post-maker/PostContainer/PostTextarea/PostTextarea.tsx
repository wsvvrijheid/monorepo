import { FC, useEffect, useRef, useState } from 'react'

import { chakra, useBoolean } from '@chakra-ui/react'
import { setPostText, useAppDispatch, useAppSelector } from '@wsvvrijheid/store'
import { useDebounce } from 'react-use'

export type PostTextareaProps = {
  isEditable?: boolean
}

export const PostTextarea: FC<PostTextareaProps> = ({ isEditable }) => {
  const [editable, setEditable] = useBoolean(isEditable)
  const { postText, threshold } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()
  const [value, setValue] = useState(postText)
  const [debouncedValue, setDebouncedValue] = useState<string>()

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  useDebounce(
    () => {
      setDebouncedValue(value)
    },
    500,
    [value],
  )

  useEffect(() => {
    if (debouncedValue) {
      dispatch(setPostText(debouncedValue))
    }
  }, [debouncedValue, dispatch])

  useEffect(() => {
    if (editable) {
      contentRef.current?.focus()
      contentRef.current?.select()
    }
  }, [editable])

  return editable ? (
    <chakra.textarea
      borderColor="gray.500"
      borderWidth={1}
      rounded="lg"
      rows={7}
      ref={contentRef}
      p={2}
      w="full"
      onBlur={setEditable.toggle}
      onChange={e => setValue(e.target.value)}
      defaultValue={postText}
    />
  ) : (
    <chakra.div
      data-tour="step-post-text"
      data-tour-mob="step-post-text"
      p={2}
      cursor="text"
      borderWidth={2}
      borderColor="transparent"
      rounded="lg"
      transition="all 0.3s ease-in-out"
      _hover={{ borderColor: 'gray.400', bg: 'white' }}
      whiteSpace="pre-line"
      onClick={setEditable.toggle}
      overflow="auto"
    >
      {postText.slice(0, threshold)}
      <chakra.span bg="red.100">{postText.slice(threshold)}</chakra.span>
    </chakra.div>
  )
}
