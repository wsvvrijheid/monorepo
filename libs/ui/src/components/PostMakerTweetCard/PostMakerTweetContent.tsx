import { ContentEditable } from '../ContentEditable'
import { usePostContext } from '../PostProvider'

export const PostMakerTweetContent = () => {
  const { sentence, updatePostContent, threshold } = usePostContext()

  const handleChange = (value: string) => {
    console.log('value', value)
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
