import { useState } from 'react'

import {
  Box,
  Button,
  Divider,
  FormLabel,
  HStack,
  Stack,
  Text,
  Textarea,
  useBoolean,
  Wrap,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  useApproveModel,
  useDeleteModel,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import {
  StrapiModel,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
} from '@wsvvrijheid/types'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { BsTrash } from 'react-icons/bs'
import { HiOutlineCheck } from 'react-icons/hi'
import { MdOutlineCheck } from 'react-icons/md'
import { InferType } from 'yup'

import { ModelEditTranslateProps, Option } from './types'
import { Flags, FormItem, WConfirm, WConfirmProps } from '../../components'
import { useDefaultValues } from '../ModelForm'

export const ModelEditTranslate = <T extends StrapiModel>({
  url,
  targetModel,
  currentModel,
  translatedFields,
  fields,
  schema,
  onSuccess,
}: ModelEditTranslateProps<T>) => {
  const router = useRouter()
  const currentModels = currentModel as StrapiTranslatableModel
  const id = targetModel?.id
  const targetModels = targetModel as StrapiTranslatableModel

  const defaultValues = useDefaultValues(targetModel, fields)

  const [isEditing, setIsEditing] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateModelMutation = useUpdateModelMutation(url)
  const deleteModelMutation = useDeleteModel(url)
  const approveModelMutation = useApproveModel(
    url,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

  const {
    register,
    formState: { errors },
    handleSubmit,
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
        {fields.map((field, index) => {
          if (currentModels?.title) {
            return (
              <Stack>
                <FormLabel htmlFor={`${currentModel?.id} title`}>
                  Title
                </FormLabel>
                <Stack direction={{ base: 'column', lg: 'row' }}>
                  <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                    <Box as={Flags[currentModels?.locale]} />
                    <Text>{currentModels?.title}</Text>
                  </HStack>
                  <HStack flex={1} align="baseline">
                    <FormItem
                      {...(field?.type === 'textarea' && { as: Textarea })}
                      key={index}
                      name={field?.name as string}
                      type={'text'}
                      errors={errors}
                      register={register}
                      isDisabled={isEditing}
                      _disabled={disabledStyle}
                    />
                  </HStack>
                </Stack>
              </Stack>
            )
          }
          if (currentModels?.description) {
            return (
              <>
                <Divider orientation="horizontal" />
                <Stack>
                  <FormLabel htmlFor={`${currentModel?.id} description`}>
                    Description
                  </FormLabel>
                  <Stack direction={{ base: 'column', lg: 'row' }}>
                    <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                      <Box as={Flags[currentModels?.locale]} />
                      <Text>{currentModels?.description}</Text>
                    </HStack>
                    <HStack flex={1} align="baseline">
                      <FormItem
                        {...(field?.type === 'textarea' && { as: Textarea })}
                        key={index}
                        name={field?.name as string}
                        type={'text'}
                        label={'Description'}
                        errors={errors}
                        register={register}
                        isDisabled={isEditing}
                        _disabled={disabledStyle}
                      />
                    </HStack>
                  </Stack>
                </Stack>
              </>
            )
          }
          if (currentModels?.content) {
            return (
              <>
                <Divider orientation="horizontal" />
                <Stack>
                  <FormLabel htmlFor={`${currentModel?.id} content`}>
                    Content
                  </FormLabel>
                  <Stack direction={{ base: 'column', lg: 'row' }}>
                    <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                      <Box as={Flags[currentModels?.locale]} />
                      <Text maxH={300} overflowY="auto">
                        {currentModels?.content}
                      </Text>
                    </HStack>
                    <HStack flex={1} align="baseline">
                      <FormItem
                        {...(field?.type === 'textarea' && { as: Textarea })}
                        key={index}
                        name={field?.name as string}
                        type={'text'}
                        errors={errors}
                        register={register}
                        isDisabled={!isEditing}
                        _disabled={disabledStyle}
                      />
                    </HStack>
                  </Stack>
                </Stack>
              </>
            )
          }
        })}
        {/*  Button group  */}
        <Wrap alignSelf={'end'} justify={'end'}>
          {targetModels?.approvalStatus === 'approved'
            ? null
            : targetModels?.approvalStatus && (
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
          <Button
            type="submit"
            leftIcon={<MdOutlineCheck />}
            colorScheme={'primary'}
            fontSize="sm"
          >
            Save
          </Button>
          <Button onClick={onDelete} leftIcon={<BsTrash />} colorScheme="red">
            Delete
          </Button>
        </Wrap>
      </Stack>
    </>
  )
}
