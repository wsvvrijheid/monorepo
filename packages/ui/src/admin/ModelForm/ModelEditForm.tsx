import { useState } from 'react'

import {
  AspectRatio,
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Stack,
  Switch,
  Textarea,
  useBoolean,
  useDisclosure,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineCheck, HiPlus } from 'react-icons/hi'
import {
  MdClose,
  MdOutlineCheck,
  MdOutlinePublishedWithChanges,
  MdOutlineUnpublished,
} from 'react-icons/md'
import { InferType } from 'yup'

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

import { ModelMedia } from './ModelMedia'
import { ModelSelect } from './ModelSelect'
import { ModelEditFormProps, Option } from './types'
import { useDefaultValues } from './utils'
import { FormItem, MasonryGrid, MdFormItem } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { useHasPermission } from '../../hooks'
import { ArtAddToCollectionModal } from '../ArtAddToCollectionCard'
import { DowloadCapsModal } from '../DowloadCapsModal'

export const ModelEditForm = <T extends StrapiModel>({
  url,
  model,
  translatedFields,
  fields,
  schema,
  onSuccess,
  onClose,
  noColumns,
  approverRoles = [],
  editorRoles = [],
  removerRoles = [],
  publisherRoles = [],
}: ModelEditFormProps<T>) => {
  const translatableModel = model as unknown as StrapiTranslatableModel

  const id = model.id
  const isPublished = translatableModel.publishedAt
  const [isEditing, setIsEditing] = useBoolean(false)
  const [isChangingImage, setIsChangingImage] = useState<{
    [x: string]: boolean
  }>({
    image: false,
    caps: false,
    avatar: false,
    video: false,
  })
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const artModalDisclosure = useDisclosure()

  const router = useRouter()
  const { t } = useTranslation()

  const updateModelMutation = useUpdateModelMutation(url)
  const unpublishModelMutation = useUnpublishModel(url)
  const publishModelMutation = usePublishModel(url)
  const deleteModelMutation = useDeleteModel(url)
  const approveModelMutation = useApproveModel(
    url,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

  const defaultValues = useDefaultValues(model, fields)

  const { getPermission } = useHasPermission()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
    watch,
    reset: resetForm,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: defaultValues,
  })

  const convertToYoutubeEmbedUrl = (videoUrl: string) => {
    if (!videoUrl) return ''

    if (!videoUrl.includes('youtube.com')) return videoUrl

    if (videoUrl.includes('embed')) return videoUrl

    const videoId = videoUrl.split('v=')[1]

    return `https://www.youtube.com/embed/${videoId}`
  }

  const getVideoUrl = () => {
    try {
      const urState = watch('videoUrl')
      const url = new URL(urState).href

      return convertToYoutubeEmbedUrl(url)
    } catch (error) {
      console.log('error', error)

      return null
    }
  }

  const videoUrl = getVideoUrl()


  const handleSuccess = () => {
    onSuccess?.()
    setIsEditing.off()
    setIsChangingImage({
      image: false,
      caps: false,
      avatar: false,
      video: false,
    })
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
    setIsChangingImage({
      image: false,
      caps: false,
      avatar: false,
      video: false,
    })
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
      <Stack as="form" onSubmit={handleSubmit(onSaveModel)} h={'full'}>
        <Flex p={8} shadow={'sm'} flex={1}>
          <MasonryGrid
            cols={noColumns ? [1] : [1, 1, 1, 2]}
            columnGap={8}
            rowGap={4}
          >
            {fields.map((field, index) => {
              const label = field.label || capitalize(field.name as string)

              if (
                field.type === 'file' &&
                (field.name === 'image' ||
                  field.name === 'avatar' ||
                  field.name === 'caps' ||
                  field.name === 'video')
              ) {
                return (
                  <FormControl
                    key={index}
                    isRequired={field.isRequired}
                    maxW={400}
                  >
                    <FormLabel
                      fontWeight={600}
                      fontSize={'sm'}
                      textTransform={'capitalize'}
                    >
                      {field?.name}
                    </FormLabel>
                    <ModelMedia
                      url={url}
                      isEditing={isEditing}
                      model={model}
                      name={field.name as string}
                      setValue={setValue}
                      isChangingMedia={isChangingImage[field.name as string]}
                      toggleChangingMedia={() =>
                        setIsChangingImage(prev => ({
                          ...prev,
                          [field.name]: isChangingImage[field.name as string]
                            ? false
                            : true,
                        }))
                      }
                    />
                    <FormErrorMessage>
                      {errors[field.name as string]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                )
              }

              if (field.type === 'boolean') {
                return (
                  <FormControl key={index} isRequired={field.isRequired}>
                    <FormLabel fontWeight={600} fontSize={'sm'}>
                      {label}
                    </FormLabel>
                    <Switch
                      colorScheme={'primary'}
                      size={'lg'}
                      isDisabled={!isEditing}
                      isChecked={watch(field.name as string)}
                      onChange={e => {
                        setValue(field.name as string, e.target.checked)
                      }}
                    />

                    <FormErrorMessage>
                      {errors[field.name as string]?.message as string}
                    </FormErrorMessage>
                  </FormControl>
                )
              }

              if (field.type === 'select') {
                return (
                  <ModelSelect<T>
                    key={index}
                    url={field.url}
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

              if (field.type === 'markdown') {
                return (
                  <Box key={index} maxH={400} overflowY={'auto'}>
                    <MdFormItem
                      name={field.name as string}
                      label={label}
                      isDisabled={!isEditing}
                      isRequired={field.isRequired}
                      errors={errors}
                      control={control}
                      _disabled={disabledStyle}
                    />
                  </Box>
                )
              }

              const inputType =
                field.type === 'date'
                  ? 'date'
                  : field.type === 'datetime-local'
                  ? 'datetime-local'
                  : 'text'

              return (
                <Stack key={index}>
                  <FormItem
                    {...(field.type === 'textarea' && { as: Textarea })}
                    name={field.name as string}
                    type={inputType}
                    label={label}
                    isRequired={field.isRequired}
                    errors={errors}
                    register={register}
                    isDisabled={!isEditing}
                    _disabled={disabledStyle}
                  />
                  {field.type === 'mediaUrl' && videoUrl && (
                    <AspectRatio ratio={16 / 9}>
                      <Box as="iframe" src={videoUrl} title={label} />
                    </AspectRatio>
                  )}
                </Stack>
              )
            })}
          </MasonryGrid>
        </Flex>
        <Flex
          justify={'end'}
          px={8}
          py={4}
          pos={'sticky'}
          bottom={0}
          bg={'white'}
        >
          <Wrap>
            {url === 'api/collections' && (
              <>
                <ArtAddToCollectionModal
                  collection={model as any}
                  isOpen={artModalDisclosure.isOpen}
                  onClose={artModalDisclosure.onClose}
                />
                {getPermission(editorRoles) && (
                  <Button
                    onClick={artModalDisclosure.onOpen}
                    leftIcon={<HiPlus />}
                    fontSize="sm"
                    colorScheme={'purple'}
                    isLoading={approveModelMutation.isLoading}
                  >
                    {/* TODO: Add translation */}
                    Add Arts
                  </Button>
                )}
              </>
            )}
            {url === 'api/hashtags' && <DowloadCapsModal id={id} />}
            {translatableModel.approvalStatus &&
              translatableModel.approvalStatus !== 'approved' &&
              getPermission(approverRoles) && (
                <Button
                  onClick={onApprove}
                  leftIcon={<HiOutlineCheck />}
                  fontSize="sm"
                  colorScheme={'purple'}
                  isLoading={approveModelMutation.isLoading}
                >
                  {t('model.approve')}
                </Button>
              )}
            {getPermission(editorRoles) && (
              <HStack>
                {!isEditing && (
                  <Button
                    onClick={setIsEditing.on}
                    leftIcon={<AiOutlineEdit />}
                    fontSize="sm"
                  >
                    {t('model.edit')}
                  </Button>
                )}
                {isEditing && (
                  <Button
                    onClick={onCancel}
                    leftIcon={<MdClose />}
                    colorScheme={'gray'}
                    fontSize="sm"
                  >
                    {t('model.cancel')}
                  </Button>
                )}
                {isEditing && (
                  <Button
                    type="submit"
                    leftIcon={<MdOutlineCheck />}
                    fontSize="sm"
                  >
                    {t('model.save')}
                  </Button>
                )}
              </HStack>
            )}
            {getPermission(publisherRoles) && (
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
                {isPublished ? t('model.unpublish') : t('model.publish')}
              </Button>
            )}
            {getPermission(removerRoles) && (
              <Button
                onClick={onDelete}
                leftIcon={<BsTrash />}
                colorScheme="red"
              >
                {t('model.delete')}
              </Button>
            )}
            {onClose && (
              <Button onClick={onClose} colorScheme="gray">
                {t('dismiss')}
              </Button>
            )}
          </Wrap>
        </Flex>
      </Stack>
    </>
  )
}
