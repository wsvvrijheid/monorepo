import { FC, useState } from 'react'

import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Stack,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useApproveMutation,
  useDeleteActivity,
  usePublishModel,
  useUnpublishModel,
  useUpdateActivityMutation,
} from '@wsvvrijheid/services'
import { UploadFile } from '@wsvvrijheid/types'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineCheck } from 'react-icons/hi'
import { IoMdClose, IoMdCloudUpload } from 'react-icons/io'
import {
  MdOutlineUnpublished,
  MdOutlinePublishedWithChanges,
  MdClose,
  MdOutlineCheck,
} from 'react-icons/md'
import * as yup from 'yup'

import { FormItem, FilePicker, WImage } from '../../components'
import { WConfirm, WConfirmProps } from '../../components/WConfirm'
import { ActivityEditFormFieldValues, ActivityEditProps } from './types'

const schema = yup.object({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  content: yup.string().required('Content is required'),
  date: yup.date().required('Date is required'),
})

export const ActivityEdit: FC<ActivityEditProps> = ({ activity }) => {
  const id = activity.id
  const isPublish = activity.publishedAt
  const [isEdit, setEdit] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [changeImage, setChangeImage] = useBoolean(false)

  const queryKey = ['activity', id]

  const updateActivityMutation = useUpdateActivityMutation(queryKey)
  const unpublishActivityMutation = useUnpublishModel(
    'api/activities',
    queryKey,
  )
  const publishActivityMutation = usePublishModel('api/activities', queryKey)
  const deleteActivityMutation = useDeleteActivity()
  const approveActivityMutation = useApproveMutation()

  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,

    reset: resetForm,
  } = useForm<ActivityEditFormFieldValues>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      title: activity.title,
      description: activity.description,
      date: new Date(activity.date).toLocaleDateString(),
      content: activity.content,
    },
  })

  const onSaveActivity = async (data: ActivityEditFormFieldValues) => {
    updateActivityMutation.mutate(
      {
        id,
        ...data,
        // FIXME: https://github.com/strapi/strapi/issues/13041#issuecomment-1095496718
        image: images[0],
      },
      {
        onSuccess: () => {
          setEdit(false)
          setChangeImage.off()
        },
      },
    )
  }

  const onCancel = () => {
    resetForm()
    setEdit(false)
    setImages([])
  }

  const onEdit = () => setEdit(true)

  const onUnPublish = () => {
    setConfirmState({
      title: 'Un Publish Collection',
      description: `Are you sure you want to unpublish this collection ?`,
      buttonText: 'Unpublish',
      onConfirm: async () => {
        await unpublishActivityMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  const onPublish = () => {
    setConfirmState({
      title: 'Publish Activity',
      description: `Are you sure you want to publish this activity ?`,
      buttonText: 'Activity',
      onConfirm: async () => {
        await publishActivityMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  const onDelete = () => {
    setConfirmState({
      isWarning: true,
      title: 'Delete Activity',
      description: 'Are you sure you want to delete this activity?',
      buttonText: 'Delete',
      onConfirm: async () => {
        await deleteActivityMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  const onApprove = () => {
    setConfirmState({
      title: 'Approve Activity',
      description: 'Are you sure you want to approve this activity?',
      buttonText: 'Approve',
      onConfirm: async () => {
        await approveActivityMutation.mutateAsync({ id })
        setConfirmState(undefined)
      },
    })
  }

  return (
    <>
      {confirmState && <WConfirm {...confirmState} />}
      <Stack
        direction={{ base: 'column', md: 'row' }}
        spacing={8}
        as="form"
        onSubmit={handleSubmit(onSaveActivity)}
      >
        {/* left side */}
        <Stack flex={1} spacing={4}>
          <FormItem
            name="title"
            label="Title"
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
            label="Description"
            as={Textarea}
            isRequired
            errors={errors}
            register={register}
            isDisabled={!isEdit}
            _disabled={{
              bg: '#EDF2F7',
              color: '#A0AEC0',
            }}
          />

          {/* <Stack>
            <FilePicker setFiles={setImages} />
            {errors.image && (
              <Text fontSize={'sm'} color="red.500">
                {errors.image.message}
              </Text>
            )}
          </Stack> */}
          <Box
            maxH={{ base: 300, lg: 'full' }}
            rounded={'md'}
            overflow="hidden"
          >
            {changeImage ? (
              <Stack>
                <FilePicker setFiles={setImages} />
                <Button
                  leftIcon={<IoMdClose />}
                  size="sm"
                  onClick={setChangeImage.toggle}
                >
                  Cancel
                </Button>
              </Stack>
            ) : (
              <Box pos="relative" role="group" h="full">
                <WImage
                  src={activity.image as UploadFile}
                  alt={activity.title}
                  hasZoom
                />
                {isEdit && (
                  <Center
                    pos="absolute"
                    top={0}
                    left={0}
                    boxSize="full"
                    bg="blackAlpha.500"
                  >
                    <Button
                      leftIcon={<IoMdCloudUpload />}
                      size="sm"
                      onClick={setChangeImage.toggle}
                    >
                      Change Image
                    </Button>
                  </Center>
                )}
              </Box>
            )}
          </Box>
        </Stack>
        {/* right side */}
        <Stack flex={1} spacing={4}>
          <FormItem
            name="date"
            label="Date"
            isRequired
            errors={errors}
            register={register}
            type={isEdit ? 'date' : 'text'}
            isDisabled={!isEdit}
            _disabled={{
              bg: '#EDF2F7',
              color: '#A0AEC0',
            }}
          />
          <FormItem
            name="content"
            label="Content"
            as={Textarea}
            isRequired
            errors={errors}
            register={register}
            size="lg"
            h="400px"
            flex={1}
            _disabled={{
              bg: '#EDF2F7',
              color: '#A0AEC0',
            }}
          />

          <ButtonGroup alignSelf="end">
            <Button
              onClick={onApprove}
              size="sm"
              leftIcon={<HiOutlineCheck />}
              fontSize="sm"
              colorScheme={'primary'}
            >
              Approve
            </Button>
            {!isEdit ? (
              <Button
                onClick={onEdit}
                size="sm"
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
                  size="sm"
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
                  colorScheme={'primary'}
                  fontSize="sm"
                  isDisabled={!isValid || (changeImage && !images.length)}
                >
                  Save
                </Button>
              </>
            )}
            <Button
              onClick={isPublish ? onUnPublish : onPublish}
              size="sm"
              leftIcon={
                isPublish ? (
                  <MdOutlineUnpublished />
                ) : (
                  <MdOutlinePublishedWithChanges />
                )
              }
              colorScheme="blue"
              fontSize="sm"
            >
              {isPublish ? 'Unpublish' : 'Publish'}
            </Button>
            <Button
              onClick={onDelete}
              size="sm"
              leftIcon={<BsTrash />}
              colorScheme="red"
            >
              Delete
            </Button>
          </ButtonGroup>
        </Stack>
      </Stack>
    </>
  )
}
