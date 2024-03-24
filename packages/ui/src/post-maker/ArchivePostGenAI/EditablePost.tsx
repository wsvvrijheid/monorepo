import { Stack } from '@chakra-ui/react'

import { EditableLine } from './EditableLine'
import { ArchivePost, useGenPostContext } from './GenPostProvider'

export type EditablePostProps = {
  postObject: ArchivePost
  archiveId: number
}

export const EditablePost: React.FC<EditablePostProps> = ({
  postObject,
  archiveId,
}) => {
  const {
    removePost,
    modifyPost,
    removeSentence: removeSentences,
  } = useGenPostContext()

  return (
    <Stack background={'gray.100'} rounded={'md'} p={2}>
      <EditableLine
        isDescription={true}
        isDisabled={archiveId < 0}
        defaultVal={postObject?.description}
        onDelete={() => removePost(archiveId, postObject.id)}
        onChange={val => {
          postObject.description = val
          modifyPost(archiveId, postObject)
        }}
      />
      {postObject?.sentences?.map((sentence, index) => {
        return (
          <EditableLine
            defaultVal={sentence}
            imageParams={postObject?.postInput?.imageParams ?? {}}
            key={`${postObject.id}-sent-${sentence}-${index}`}
            isDisabled={archiveId < 0}
            onDelete={() => {
              removeSentences(archiveId, postObject, sentence)
            }}
            onChange={val => {
              postObject.sentences[index] = val
              modifyPost(archiveId, postObject)
            }}
          />
        )
      })}
    </Stack>
  )
}
