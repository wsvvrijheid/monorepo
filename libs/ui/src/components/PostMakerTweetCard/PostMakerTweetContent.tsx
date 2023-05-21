import { ContentEditable } from '../ContentEditable'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetContent = () => {
  const { sentence, updatePostContent, threshold } = usePostContext()

  const handleChange = (sentence: string) => {
    updatePostContent({ sentence })
  }

  return (
    <ContentEditable
      value={sentence}
      onUpdate={handleChange}
      threshold={threshold}
    />
  )
}
