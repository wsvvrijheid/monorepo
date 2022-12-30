import { useMemo, useState } from 'react'

import {
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  HStack,
  Spacer,
  Stack,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { QueryKey } from '@tanstack/react-query'
import {
  useApproveModel,
  useDeleteModel,
  usePublishModel,
  useUnpublishModel,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import {
  Activity,
  ActivityUpdateInput,
  Hashtag,
  Post,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { format } from 'date-fns'
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
import { OptionalObjectSchema } from 'yup/lib/object'

import { FormItem } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { HashtagSelect } from './HashtagSelect'
import { MentionSelect } from './MentionSelect'
import { ModelImage } from './ModelImage'

export const ModelEdit = <T extends StrapiTranslatableModel>({
  url,
  model,
  translatedFields,
  fields,
  schema,
  queryKey,
}: {
  url: StrapiUrl
  model: T
  translatedFields: (keyof T)[]
  fields: (keyof T)[]
  schema: OptionalObjectSchema<any>
  queryKey: QueryKey
}) => {
  type ModelEditFormFieldValues = yup.InferType<typeof schema>

  const hashtagModel = model as Hashtag
  const hashtagKeys = fields as (keyof Hashtag)[]
  const postModel = model as Post
  const postKeys = fields as (keyof Post)[]

  const id = model.id
  const isPublished = model.publishedAt
  const [isEditing, setIsEditing] = useBoolean(false)
  const [isChangingImage, setIsChangingImage] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateModelMutation = useUpdateModelMutation(url, queryKey)
  const unpublishModelMutation = useUnpublishModel(url, queryKey)
  const publishModelMutation = usePublishModel(url, queryKey)
  const deleteModelMutation = useDeleteModel(url, queryKey)
  const approveModelMutation = useApproveModel(url, translatedFields, queryKey)

  const defaultValues = useMemo(() => {
    const defaults = {} as any

    fields.forEach(field => {
      switch (field) {
        case 'date':
          ;(defaults as ActivityUpdateInput).date = (model as Activity).date
            ? format(new Date((model as Activity).date), 'yyyy-MM-dd')
            : undefined
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
          defaults[field] = model[field] || undefined
          break
      }
    })

    return defaults
  }, [model, fields])

  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    control,
    setValue,
    reset: resetForm,
  } = useForm<ModelEditFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  })

  const image = watch('image')

  const onSaveModel = async (data: ModelEditFormFieldValues) => {
    console.log('data', data)
    const mentions = data['mentions']?.map((m: any) => m.value)
    const hashtag = data['hashtag']?.value

    updateModelMutation.mutate(
      {
        id,
        ...data,
        mentions,
        hashtag,
        image,
      },
      {
        onSuccess: () => {
          setIsEditing.off()
        },
      },
    )
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
        await unpublishModelMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  const onPublish = () => {
    setConfirmState({
      title: 'Publish Activity',
      description: `Are you sure you want to publish this model ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishModelMutation.mutateAsync({ id })
        setConfirmState(undefined)
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
        await deleteModelMutation.mutateAsync({ id })
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
        await approveModelMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  console.log('errors', errors)

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
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={8}
        as="form"
        onSubmit={handleSubmit(onSaveModel)}
      >
        {/* left side */}
        <Stack flex={1} spacing={4}>
          <FormItem
            name="title"
            label="Title"
            isRequired
            errors={errors}
            register={register}
            isDisabled={!isEditing}
            _disabled={disabledStyle}
          />
          <FormItem
            name="description"
            label="Description"
            as={Textarea}
            isRequired
            errors={errors}
            register={register}
            isDisabled={!isEditing}
            _disabled={disabledStyle}
          />
          {hashtagKeys.includes('hashtagDefault') && (
            <HStack>
              <FormItem
                name="hashtag"
                label="Hashtag"
                isRequired
                errors={errors}
                register={register}
                isDisabled={!isEditing}
                _disabled={disabledStyle}
              />
              <FormItem
                name="hashtagExtra"
                label="Hashtag Extra"
                errors={errors}
                register={register}
                isDisabled={!isEditing}
                _disabled={disabledStyle}
              />
            </HStack>
          )}
          <FormControl isRequired>
            <FormLabel>Image</FormLabel>
            <ModelImage
              isEditing={isEditing}
              model={model}
              setValue={setValue}
              isChangingImage={isChangingImage}
              setIsChangingImage={setIsChangingImage}
            />
          </FormControl>
        </Stack>
        {/* right side */}
        <Stack flex={1} spacing={4}>
          {postKeys.includes('reference') && (
            <FormItem
              name="reference"
              label="Reference"
              errors={errors}
              register={register}
              isDisabled={!isEditing}
              _disabled={disabledStyle}
            />
          )}
          {hashtagKeys.includes('date') && (
            <FormItem
              name="date"
              label="Date"
              isRequired
              errors={errors}
              register={register}
              type={'date'}
              isDisabled={!isEditing}
              _disabled={disabledStyle}
            />
          )}
          {postKeys.includes('hashtag') && (
            <FormControl>
              <FormLabel>Hashtag</FormLabel>
              <HashtagSelect
                isEditing={isEditing}
                control={control}
                errors={errors}
              />
            </FormControl>
          )}
          {hashtagKeys.includes('mentions') && (
            <FormControl>
              <FormLabel>Mentions</FormLabel>

              <MentionSelect
                isEditing={isEditing}
                control={control}
                errors={errors}
              />
            </FormControl>
          )}
          <FormItem
            name="content"
            label="Content"
            as={Textarea}
            isDisabled={!isEditing}
            errors={errors}
            register={register}
            size="lg"
            h="400px"
            flex={1}
            _disabled={disabledStyle}
          />

          <Spacer />

          <ButtonGroup alignSelf="end">
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
          </ButtonGroup>
        </Stack>
      </Stack>
    </>
  )
}
