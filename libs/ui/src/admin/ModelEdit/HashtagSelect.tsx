import { FC } from 'react'

import { useHashtags } from '@wsvvrijheid/services'
import { Control, FieldErrorsImpl } from 'react-hook-form'
import { AssertsShape } from 'yup/lib/object'

import { WSelect } from '../../components'

type HashtagSelectProps = {
  isEditing: boolean
  control: Control<AssertsShape<any>, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export const HashtagSelect: FC<HashtagSelectProps> = ({
  control,
  errors,
  isEditing,
}) => {
  const hashtags = useHashtags()

  return (
    <WSelect
      isDisabled={!isEditing}
      name="hashtag"
      control={control}
      errors={errors}
      options={
        hashtags.data?.map(h => ({
          value: h.id.toString(),
          label: h.title,
        })) || []
      }
    />
  )
}
