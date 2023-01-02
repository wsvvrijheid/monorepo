import { useMemo, useState } from 'react'

import {
  Button,
  FormControl,
  FormLabel,
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
  Activity,
  Hashtag,
  Post,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { format } from 'date-fns'
import { capitalize } from 'lodash'
import Router from 'next/router'
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
import * as yup from 'yup'

import { FormItem } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { ModelImage } from './ModelImage'
import { ModelSelect } from './ModelSelect'
import { ModelEditFormProps, Option } from './types'

export const ModelEditForm = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableUpdateInput,
>({
  url,
  model,
  translatedFields,
  fields,
  schema,
  onSuccess,
}: ModelEditFormProps<T, D>) => {
  const hashtagModel = model as Hashtag
  const postModel = model as Post

  const id = model.id
  const isPublished = model.publishedAt
  const [isEditing, setIsEditing] = useBoolean(false)
  const [isChangingImage, setIsChangingImage] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateModelMutation = useUpdateModelMutation(url)
  const unpublishModelMutation = useUnpublishModel(url)
  const publishModelMutation = usePublishModel(url)
  const deleteModelMutation = useDeleteModel(url)
  const approveModelMutation = useApproveModel(url, translatedFields)

  const defaultValues = useMemo(() => {
    const defaults = {} as any
    const { date } = model as Activity
    const dateString = date ? format(new Date(date), 'yyyy-MM-dd') : undefined
    const dateTimeString = date
      ? new Date(date).toISOString().replace('Z', '')
      : undefined

    fields.forEach(field => {
      switch (field.name) {
        case 'date':
          if (field.type === 'date') {
            defaults[field.name] = dateString
          } else if (field.type === 'datetime-local') {
            defaults[field.name] = dateTimeString
          }
          break
        case 'mentions':
          defaults.mentions =
            hashtagModel.mentions?.map(m => ({
              label: m.username,
              value: m.id.toString(),
            })) || []
          break
        case 'hashtag':
          defaults.hashtag = {
            label: postModel.hashtag?.title,
            value: postModel.hashtag?.id.toString(),
          }

          break
        default:
          defaults[field.name] = model[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
  }, [model, fields])

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    reset: resetForm,
  } = useForm<yup.InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  })

  const handleSuccess = () => {
    onSuccess?.()
    setIsEditing.off()
    setIsChangingImage.off()
    setValue('image', undefined)
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
    setIsChangingImage.off()
    setValue('image', undefined)
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
        Router.back()
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
    color: 'blackAlpha.500',
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
        <SimpleGrid rowGap={4} columnGap={8} columns={{ base: 1, lg: 2 }}>
          {fields.map((field, index) => {
            const label = field.label || capitalize(field.name as string)

            if (field.type === 'file') {
              return (
                <FormControl
                  key={index}
                  isRequired={field.isRequired}
                  maxW={500}
                >
                  <FormLabel>Image</FormLabel>
                  <ModelImage
                    isEditing={isEditing}
                    model={model}
                    setValue={setValue}
                    isChangingImage={isChangingImage}
                    setIsChangingImage={setIsChangingImage}
                  />
                </FormControl>
              )
            }

            if (field.type === 'select') {
              return (
                <ModelSelect
                  key={index}
                  url={field.url as StrapiUrl}
                  isMulti={field.isMulti}
                  isRequired={field.isRequired}
                  name={field.name as string}
                  isDisabled={!isEditing}
                  label={label}
                  errors={errors}
                  control={control}
                  _disabled={disabledStyle}
                />
              )
            }

            return (
              <FormItem
                {...(field.type === 'textarea' && { as: Textarea })}
                key={index}
                name={field.name as string}
                type={field.type || 'text'}
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
          {model.approvalStatus === 'approved' ? null : (
            <Button
              onClick={onApprove}
              leftIcon={<HiOutlineCheck />}
              fontSize="sm"
              colorScheme={'primary'}
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
            leftIcon={
              isPublished ? (
                <MdOutlineUnpublished />
              ) : (
                <MdOutlinePublishedWithChanges />
              )
            }
            colorScheme="blue"
            fontSize="sm"
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
