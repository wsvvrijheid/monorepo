import { FormEventHandler, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { usePostContext } from '@wsvvrijheid/context'

export const PostMakerTweetContent = ({ id }: { id: number }) => {
  const { post, updatePost } = usePostContext(id)

  const contentRef = useRef<HTMLDivElement>(null)
  const caretPos = useRef<number>(0)

  const getCaret = (el: HTMLDivElement) => {
    let caretAt = 0
    const sel = window.getSelection()

    if (!sel) return 0

    if (sel.rangeCount === 0) {
      return caretAt
    }

    const range = sel.getRangeAt(0)
    const preRange = range.cloneRange()
    preRange.selectNodeContents(el)
    preRange.setEnd(range.endContainer, range.endOffset)
    caretAt = preRange.toString().length

    return caretAt
  }

  function setCaret(el: HTMLDivElement, offset: number) {
    const sel = window.getSelection()
    const range = document.createRange()

    if (el.childNodes.length && sel) {
      range.setStart(el.childNodes[0], offset)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  }

  const handleInput: FormEventHandler<HTMLDivElement> = e => {
    updatePost({ sentence: e.currentTarget.textContent ?? '' })

    if (contentRef.current) {
      caretPos.current = getCaret(contentRef.current) as number
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setCaret(contentRef.current, caretPos.current)
      contentRef.current.focus()
    }
  }, [post.sentence])

  return (
    <Box
      p={2}
      ref={contentRef}
      _focusVisible={{
        outline: 'none',
      }}
      suppressContentEditableWarning
      contentEditable
      onInput={handleInput}
    >
      {post.sentence}
    </Box>
  )
}
