import { useState } from 'react'

import {
  Button,
  SimpleGrid,
  Stack,
  Textarea,
  useBoolean,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useApproveModel,
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
} from '@wsvvrijheid/types'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineCheck } from 'react-icons/hi'
import {
  MdClose,
  MdOutlineCheck,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'
import { InferType } from 'yup'

import { Option } from './types'
import { FormItem, MdFormItem } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { ModelEditFormProps, useDefaultValues } from '../ModelForm'

export const ModelEditTranslate = <T extends StrapiModel>({
  url,
  model,
  translatedFields,
  fields,
  schema,
  onSuccess,
}: ModelEditFormProps<T>) => {
  const translatableModel = model as StrapiTranslatableModel

  const id = model.id
  const isPublished = translatableModel.publishedAt
  const [isEditing, setIsEditing] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const router = useRouter()

  const updateModelMutation = useUpdateModelMutation(url)
  const unpublishModelMutation = useUnpublishModel(url)
  const publishModelMutation = usePublishModel(url)
  const deleteModelMutation = useDeleteModel(url)
  const approveModelMutation = useApproveModel(
    url,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

  const defaultValues = useDefaultValues(model, fields)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    reset: resetForm,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: defaultValues,
  })

  const handleSuccess = () => {
    onSuccess?.()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  const onSaveModel = async (
    data: Record<string, string | File | Option | Option[]>,
  ) => {
    const body = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || !fields.some(f => f.name === key)) {
        return acc
      }

      if (Array.isArray(value)) {
        return {
          ...acc,
          [key]: value.map(v => v.value),
        }
      }

      if ((value as Option).value) {
        return {
          ...acc,
          [key]: (value as Option).value,
        }
      }

      return {
        ...acc,
        [key]: value,
      }
    }, {} as StrapiTranslatableUpdateInput)

    updateModelMutation.mutate({ id, ...body }, { onSuccess: handleSuccess })
  }

  const onCancel = () => {
    resetForm()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  const onUnPublish = () => {
    setConfirmState({
      title: 'Unpublish model',
      description: `Are you sure you want to unpublish this collection ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        unpublishModelMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const onPublish = () => {
    setConfirmState({
      title: 'Publish Activity',
      description: `Are you sure you want to publish this model ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        publishModelMutation.mutate({ id }, { onSuccess: handleSuccess })
      },
    })
  }

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Activity',
      description: 'Are you sure you want to delete this model?',
      buttonText: 'Delete',
      onConfirm: async () => {
        deleteModelMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
        router.back()
      },
    })
  }

  const onApprove = () => {
    setConfirmState({
      title: 'Approve Activity',
      description: 'Are you sure you want to approve this model?',
      buttonText: 'Approve',
      onConfirm: async () => {
        approveModelMutation.mutate({ id }, { onSuccess: handleSuccess })
        setConfirmState(undefined)
      },
    })
  }

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack spacing={8} as="form" onSubmit={handleSubmit(onSaveModel)}>
        <SimpleGrid columnGap={8} rowGap={4}>
          {fields.map((field, index) => {
            const label = field.label || capitalize(field.name as string)

            if (field.type === 'markdown') {
              return (
                <MdFormItem
                  key={index}
                  name={field.name as string}
                  label={label}
                  isDisabled={!isEditing}
                  isRequired={field.isRequired}
                  errors={errors}
                  control={control}
                  _disabled={disabledStyle}
                />
              )
            }

            const inputType =
              field.type === 'date'
                ? 'date'
                : field.type === 'datetime-local'
                ? 'datetime-local'
                : 'text'

            return (
              <FormItem
                {...(field.type === 'textarea' && { as: Textarea })}
                key={index}
                name={field.name as string}
                type={inputType}
                label={label}
                isRequired={field.isRequired}
                errors={errors}
                register={register}
                isDisabled={!isEditing}
                _disabled={disabledStyle}
              />
            )
          })}
        </SimpleGrid>
        <Wrap alignSelf={'end'} justify={'end'}>
          {translatableModel.approvalStatus === 'approved'
            ? null
            : translatableModel.approvalStatus && (
                <Button
                  onClick={onApprove}
                  leftIcon={<HiOutlineCheck />}
                  fontSize="sm"
                  colorScheme={'purple'}
                  isLoading={approveModelMutation.isLoading}
                >
                  Approve
                </Button>
              )}
          {!isEditing ? (
            <Button
              onClick={setIsEditing.on}
              leftIcon={<AiOutlineEdit />}
              colorScheme={'primary'}
              fontSize="sm"
            >
              Edit
            </Button>
          ) : (
            <>
              <Button
                onClick={onCancel}
                leftIcon={<MdClose />}
                colorScheme={'gray'}
                fontSize="sm"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                leftIcon={<MdOutlineCheck />}
                colorScheme={'primary'}
                fontSize="sm"
              >
                Save
              </Button>
            </>
          )}
          <Button
            onClick={isPublished ? onUnPublish : onPublish}
            colorScheme={isPublished ? 'yellow' : 'green'}
            fontSize="sm"
            leftIcon={
              isPublished ? (
                <MdOutlineUnpublished />
              ) : (
                <MdOutlinePublishedWithChanges />
              )
            }
          >
            {isPublished ? 'Unpublish' : 'Publish'}
          </Button>
          <Button onClick={onDelete} leftIcon={<BsTrash />} colorScheme="red">
            Delete
          </Button>
        </Wrap>
      </Stack>
    </>
  )
}
