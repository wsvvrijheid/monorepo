import { FormEventHandler, useEffect, useRef } from 'react'

import { Box } from '@chakra-ui/react'

import { usePostContext } from '@wsvvrijheid/context'

export const PostMakerTweetContent = () => {
  const { sentence, updatePostContent, threshold } = usePostContext()

  const contentRef = useRef<HTMLDivElement>(null)
  const caretPos = useRef<number>(0)

  const getCaret = (el: HTMLDivElement) => {
    let caretAt = 0
    const selection = window.getSelection()

    if (!selection) return 0

    if (selection.rangeCount === 0) {
      return caretAt
    }

    const range = selection.getRangeAt(0)
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
    updatePostContent({ sentence: e.currentTarget.textContent ?? '' })

    if (contentRef.current) {
      caretPos.current = getCaret(contentRef.current) as number
    }
  }

  useEffect(() => {
    if (contentRef.current) {
      setCaret(contentRef.current, caretPos.current)
      contentRef.current.focus()
    }
  }, [sentence])

  const normalSentence = sentence.slice(0, threshold)
  const redSentence = sentence.slice(threshold)

  return (
    <Box pos={'relative'}>
      <Box p={2} pos={'absolute'} top={0} left={0} boxSize={'full'}>
        {normalSentence}
        <Box as={'span'} color={'red'}>
          {redSentence}
        </Box>
      </Box>
      <Box
        pos={'relative'}
        bg={'transparent'}
        sx={{
          WebkitTextFillColor: 'transparent',
        }}
        p={2}
        ref={contentRef}
        _focusVisible={{
          outline: 'none',
        }}
        suppressContentEditableWarning
        contentEditable
        onInput={handleInput}
      >
        {sentence}
      </Box>
    </Box>
  )
}
