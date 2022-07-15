import { truncateText } from './truncateText'

export const makeSocialContent = (content: string, title?: string) => {
  const twitterCharLimit = 280
  const linkCharCount = 23 + 2 // 2 chars is because of the library leaves spaces before/after the link
  const titleCharCount = title?.length || 0
  const twitterText = truncateText(
    content,
    twitterCharLimit - linkCharCount - titleCharCount,
  )
  const twitterContent = title ? title + '\n\n' + twitterText : twitterText

  return { twitterContent, content }
}
