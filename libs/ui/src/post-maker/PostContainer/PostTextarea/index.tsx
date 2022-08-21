import React, { useEffect, useRef } from 'react'

import { chakra, useBoolean } from '@chakra-ui/react'
import useDebounce from '@rooks/use-debounce'
import { setPostText, useAppDispatch, useAppSelector } from '@store'

export const PostTextarea = () => {
  const [editable, setEditable] = useBoolean(false)
  const { postText, threshold } = useAppSelector(state => state.post)
  const dispatch = useAppDispatch()

  const contentRef = useRef<HTMLTextAreaElement | null>(null)

  const handleChange = useDebounce((value: string) => {
    dispatch(setPostText(value))
  }, 500)

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
      onChange={e => handleChange(e.target.value)}
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
