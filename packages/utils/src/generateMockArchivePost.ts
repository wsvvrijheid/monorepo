// Don't export this function from index.ts because it's used only in edge environment

import { loremIpsum } from 'lorem-ipsum'

export const generateMockArchivePost = (
  numberOfDescriptions: number,
  numberOfSentences: number,
  charLimitOfDescriptions: number,
  charLimitOfSentences: number,
): Array<{ description: string; sentences: string[] }> => {
  const result: Array<{ description: string; sentences: string[] }> = []

  // Average word count of a tweet is between 2-10
  const avgWordCharCount = Math.random() * (10 - 2) + 2

  for (let i = 0; i < numberOfDescriptions; i++) {
    const wordCount = Math.floor(charLimitOfDescriptions / avgWordCharCount)

    const description = loremIpsum({
      count: 1,
      units: 'sentences',
      sentenceUpperBound: wordCount + 2,
    })?.slice(0, charLimitOfDescriptions)

    const sentences = []
    for (let j = 0; j < numberOfSentences; j++) {
      // Average word count of a tweet is between 5-15
      const wordCount = Math.floor(charLimitOfSentences / avgWordCharCount)

      const sentence = loremIpsum({
        count: 1,
        units: 'sentences',
        sentenceUpperBound: wordCount + 2,
      })?.slice(0, charLimitOfSentences)

      sentences.push(sentence)
    }

    result.push({ description, sentences })
  }

  return result
}
