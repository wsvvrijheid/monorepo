import { ContentEditable } from '../../components'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetContent = () => {
  const { sentence, updatePostContent, threshold } = usePostContext()

  const handleChange = (value: string) => {
    if (!sentence) return

    updatePostContent({
      sentence: {
        ...sentence,
        value,
      },
    })
  }

  return (
    <ContentEditable
      value={sentence?.value ?? ''}
      onUpdate={handleChange}
      threshold={threshold}
    />
  )
}
