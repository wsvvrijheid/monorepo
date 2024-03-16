// Don't export this function from index.ts because it's used only in edge environment

import { loremIpsum } from 'lorem-ipsum'

export const generatePostMock = (
  numberOfDescriptions: number,
  numberOfSentences: number,
  charLimitOfDescriptions: number,
  charLimitOfSentences: number,
): Array<{ description: string; sentences: string[] }> => {
  const result: Array<{ description: string; sentences: string[] }> = []

  for (let i = 0; i < numberOfDescriptions; i++) {
    const description = loremIpsum({
      count: 1,
      units: 'sentences',
      sentenceLowerBound: charLimitOfDescriptions,
      sentenceUpperBound: charLimitOfDescriptions,
    })

    const sentences = []
    for (let j = 0; j < numberOfSentences; j++) {
      const sentence = loremIpsum({
        count: 1,
        units: 'sentences',
        sentenceLowerBound: charLimitOfSentences,
        sentenceUpperBound: charLimitOfSentences,
      })
      sentences.push(sentence)
    }

    result.push({ description, sentences })
  }

  return result
}
