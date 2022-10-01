import React, { FC, useState } from 'react'

import {
  Stack,
  Textarea,
  ButtonGroup,
  Button,
  HStack,
  useDisclosure,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import { UploadFile } from '@wsvvrijheid/types'
import {
  useDeleteCollection,
  useUnpublishModel,
  useUpdateCollectionMutation,
  usePublishModel,
} from '@wsvvrijheid/utils'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'react-i18next'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import {
  MdOutlineUnpublished,
  MdClose,
  MdOutlineCheck,
  MdOutlinePublishedWithChanges,
} from 'react-icons/md'
import * as yup from 'yup'

import { FilePicker, FormItem } from '../../components'
import { WImage } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { CollectionEditFormProps, CollectionEditFormFieldValues } from './types'

const schema = (t: TFunction) =>
  yup.object({
    title: yup.string().required(t`art.create.form.title-required`),
    description: yup.string().required(t`art.create.form.description-required`),
  })

export const CollectionEditForm: FC<CollectionEditFormProps> = ({
  collection,
  isEdit,
  toogleEdit,
  queryKey,
}) => {
  const id = collection.id
  const isPublish = collection.publishedAt
  const { t } = useTranslation()

  const [images, setImages] = useState<Blob[]>([])
  const updateCollectionMutation = useUpdateCollectionMutation(queryKey)
  const unpublishCollectionMutation = useUnpublishModel(
    'api/collections',
    queryKey,
  )
  const publishCollectionMutation = usePublishModel('api/collections', queryKey)
  const deleteCollectionMutation = useDeleteCollection(queryKey)

  const confirmDisclosure = useDisclosure()
  const [confirmState, setConfirmState] =
    useState<Omit<WConfirmProps, 'onClose' | 'isOpen' | 'onOpen'>>()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset: resetForm,
  } = useForm<CollectionEditFormFieldValues>({
    resolver: yupResolver(schema(t)),
    mode: 'all',
    defaultValues: {
      title: collection.title,
      description: collection.description,
    },
  })

  const onSaveCollection = async (data: CollectionEditFormFieldValues) => {
    updateCollectionMutation.mutate(
      {
        id,
        ...(images.length > 0 && {
          image: images[0],
        }),
        ...data,
      },
      {
        onSuccess: () => toogleEdit(false),
      },
    )
  }

  const onCancel = () => {
    resetForm()
    toogleEdit(false)
  }
  const onEdit = () => toogleEdit(true)
  const onUnPublish = () => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Un Publish Collection',
      description: `Are you sure you want to unpublish this collection ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishCollectionMutation.mutateAsync({ id })

        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onPublish = () => {
    confirmDisclosure.onOpen()
    setConfirmState({
      title: 'Publish Collection',
      description: `Are you sure you want to publish this collection ?`,
      buttonText: 'Publish',
      onConfirm: async () => {
        await publishCollectionMutation.mutateAsync({ id })

        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }
  const onDelete = () => {
    confirmDisclosure.onOpen()
    setConfirmState({
      isWarning: true,
      title: 'Delete Collection',
      description: 'Are you sure you want to delete this collection?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deleteCollectionMutation.mutateAsync({ id })
        setConfirmState(undefined)
        confirmDisclosure.onClose()
      },
    })
  }

  return (
    <>
      {confirmState && (
        <WConfirm
          isOpen={confirmDisclosure.isOpen}
          onClose={confirmDisclosure.onClose}
          {...confirmState}
        />
      )}

      <HStack
        justify={'flex-start'}
        align={'flex-start'}
        p={{ base: 4, lg: 8 }}
        minH="350px"
        spacing={8}
        boxShadow="sm"
      >
        {isEdit ? (
          <FilePicker setFiles={setImages} height="350px" width={'300px'} />
        ) : (
          <WImage
            ratio="twitter"
            src={collection.image as UploadFile}
            rounded={'lg'}
            alt={collection.title}
            hasZoom={true}
            w={300}
            h={350}
          />
        )}

        <Stack
          as="form"
          onSubmit={handleSubmit(onSaveCollection)}
          w="full"
          h={350}
          spacing={4}
        >
          <FormItem
            name="title"
            label={t`title`}
            isRequired
            errors={errors}
            register={register}
            isDisabled={!isEdit}
            _disabled={{
              bg: '#EDF2F7',
              color: '#A0AEC0',
            }}
          />
          <FormItem
            name="description"
            label={t`description`}
            as={Textarea}
            size="lg"
            isRequired
            errors={errors}
            register={register}
            isDisabled={!isEdit}
            h="180px"
            _disabled={{
              bg: '#EDF2F7',
              color: '#A0AEC0',
            }}
          />
          {/* <FormItem
          name="content"
          label={t`content`}
          as={Textarea}
          isRequired
          errors={errors}
          register={register}
        /> */}
          <ButtonGroup alignSelf="end" mt="4">
            <Button
              onClick={onDelete}
              mr={3}
              leftIcon={<BsTrash />}
              variant={'ghost'}
              colorScheme={'gray'}
              fontSize="sm"
            >
              Delete
            </Button>
            <Button
              onClick={isPublish ? onUnPublish : onPublish}
              mr={3}
              leftIcon={
                isPublish ? (
                  <MdOutlineUnpublished />
                ) : (
                  <MdOutlinePublishedWithChanges />
                )
              }
              variant={'ghost'}
              colorScheme={'gray'}
              fontSize="sm"
            >
              {isPublish ? 'Unpublish' : 'Publish'}
            </Button>

            {!isEdit ? (
              <Button
                onClick={onEdit}
                mr={3}
                leftIcon={<AiOutlineEdit />}
                variant={'ghost'}
                colorScheme={'gray'}
                fontSize="sm"
              >
                Edit
              </Button>
            ) : (
              <>
                {' '}
                <Button
                  onClick={onCancel}
                  mr={3}
                  leftIcon={<MdClose />}
                  colorScheme={'gray'}
                  fontSize="sm"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  mr={3}
                  leftIcon={<MdOutlineCheck />}
                  colorScheme={'green'}
                  fontSize="sm"
                  isDisabled={!isValid}
                >
                  Save
                </Button>
              </>
            )}
          </ButtonGroup>
        </Stack>
      </HStack>
    </>
  )
}
