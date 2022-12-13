import { useCallback, useEffect } from 'react'

import { DEFAULT_POST_SENTENCES } from '@wsvvrijheid/config'
import { setPostText, useAppDispatch, useAppSelector } from '@wsvvrijheid/store'
import { StrapiLocale } from '@wsvvrijheid/types'
import { sample } from 'lodash'
import { useRouter } from 'next/router'

export const useRandomPostContent = (text: string) => {
  const dispatch = useAppDispatch()
  const { locale } = useRouter()
  const { availableCount } = useAppSelector(state => state.post)

  const generateRandomPostContent = useCallback(() => {
    if (!text) return

    const randomPostSentence = sample(
      DEFAULT_POST_SENTENCES[locale as StrapiLocale],
    ) as string

    const postSentences = text
      .replace(/\.\.+/g, '.') // remove multiple dots
      .replace(/"+/g, '') // remove double quotes
      .split(/\.|\?|!|\n/g) // split by sentence
      .map(sentence => sentence.trim())
      .filter(Boolean)

    const postLength = postSentences.length

    const combinationArray = [...Array(postLength)].map((_, i) => i)

    const combinations = combinationArray.flatMap((v, i) =>
      combinationArray.slice(i + 1).map(w => [v, w]),
    )

    const [firstCombination, secondCombination] = sample(combinations) || [0, 1]

    const randomPostText = postSentences
      .slice(firstCombination || 0, secondCombination || 1)
      .join('. ')

    let combinedText = `${randomPostText}\n\n"${randomPostSentence}"`

    if (combinedText.length > availableCount) {
      combinedText = `${randomPostText.slice(
        0,
        availableCount - randomPostSentence.length - 9,
      )}...\n\n"${randomPostSentence}"`
    }

    dispatch(setPostText(combinedText))
  }, [locale, availableCount, text, dispatch])

  useEffect(() => {
    generateRandomPostContent()
  }, [locale, availableCount, text, generateRandomPostContent])

  return generateRandomPostContent
}
