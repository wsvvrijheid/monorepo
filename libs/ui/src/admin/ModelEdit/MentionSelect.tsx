import { FC } from 'react'

import { useGetMentions } from '@wsvvrijheid/services'
import { Control, FieldErrorsImpl } from 'react-hook-form'
import { AssertsShape } from 'yup/lib/object'

import { WSelect } from '../../components'

type MentionSelectProps = {
  isEditing: boolean
  control: Control<AssertsShape<any>, any>
  errors: Partial<
    FieldErrorsImpl<{
      [x: string]: any
    }>
  >
}

export const MentionSelect: FC<MentionSelectProps> = ({
  control,
  errors,
  isEditing,
}) => {
  const mentions = useGetMentions()

  return (
    <WSelect
      isMulti
      isDisabled={!isEditing}
      name="mentions"
      control={control}
      errors={errors}
      options={
        mentions.data?.map(c => ({
          value: c.id.toString(),
          label: `@${c.username}`,
        })) || []
      }
    />
  )
}
