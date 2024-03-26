import { useState } from 'react'

import { Stack } from '@chakra-ui/react'

import { EditableLine } from './EditableLine'
import { ArchivePost, useGenPostContext } from './GenPostProvider'

export type EditablePostProps = {
  postObject: ArchivePost
  archiveId: number
  descriptionThreshold?: number
  sentenceThreshold?: number
}

export const EditablePost: React.FC<EditablePostProps> = ({
  postObject,
  archiveId,
  descriptionThreshold = 250,
  sentenceThreshold = 200,
}) => {
  const {
    removePost,
    modifyPost,
    removeSentence: removeSentences,
  } = useGenPostContext()

  const [archivePost, setArchivePost] = useState<ArchivePost>(postObject)

  const handleChangeSentence = (index: number, value: string) => {
    const newSentences = archivePost.sentences.map((sentence, i) => {
      if (i === index) {
        return value
      }

      return sentence
    })

    setArchivePost({
      ...archivePost,
      sentences: newSentences,
    })

    modifyPost(archiveId, {
      ...archivePost,
      sentences: newSentences,
    })
  }

  const handleChangeDescription = (value: string) => {
    setArchivePost({
      ...archivePost,
      description: value,
    })

    modifyPost(archiveId, {
      ...archivePost,
      description: value,
    })
  }

  return (
    <Stack
      background={'blackAlpha.100'}
      borderWidth={1}
      borderColor={'blackAlpha.300'}
      rounded={'md'}
      p={2}
    >
      <EditableLine
        isDescription={true}
        isDisabled={archiveId < 0}
        defaultValue={postObject?.description}
        onDelete={() => removePost(archiveId, postObject.id)}
        onUpdate={handleChangeDescription}
        value={archivePost?.description}
        threshold={descriptionThreshold}
        thresholdStyles={{
          color: 'red.400',
        }}
        fontWeight={500}
        rounded={'md'}
      />
      {postObject?.sentences?.map((sentence, index) => {
        return (
          <EditableLine
            defaultValue={sentence}
            imageParams={postObject?.postInput?.imageParams ?? {}}
            key={`${postObject.id}-sent-${sentence}-${index}`}
            isDisabled={archiveId < 0}
            onDelete={() => {
              removeSentences(archiveId, postObject, sentence)
            }}
            onUpdate={val => handleChangeSentence(index, val)}
            value={archivePost?.sentences[index]}
            threshold={sentenceThreshold}
            rounded={'md'}
            thresholdStyles={{
              color: 'red.400',
            }}
          />
        )
      })}
    </Stack>
  )
}
