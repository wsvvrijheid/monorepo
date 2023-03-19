import { useState } from 'react'

import {
  Box,
  Button,
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
  useModelById,
  useUpdateModelMutation,
} from '@wsvvrijheid/services'
import {
  StrapiLocale,
  StrapiTranslatableModel,
  StrapiTranslatableUpdateInput,
} from '@wsvvrijheid/types'
import { useTranslation } from 'next-i18next'
import { useForm } from 'react-hook-form'
import { AiOutlineEdit } from 'react-icons/ai'
import { HiOutlineCheck } from 'react-icons/hi'
import { MdClose, MdOutlineCheck } from 'react-icons/md'
import { InferType } from 'yup'

import { ModelEditTranslateProps, Option } from './types'
import {
  Flags,
  FormItem,
  MdFormItem,
  WConfirm,
  WConfirmProps,
} from '../../components'
import { useReferenceModel } from '../../hooks'
import { FormLocaleSwitcher } from '../FormLocaleSwitcher'
import { useDefaultValues } from '../ModelForm'

export const ModelEditTranslate = <T extends StrapiTranslatableModel>({
  id,
  url,
  translatedFields,
  fields,
  pathname,
  schema,
}: ModelEditTranslateProps<T>) => {
  const { t } = useTranslation()

  const { data: model, refetch } = useModelById<T>({ url, id })

  const referenceModel = useReferenceModel<T>(model)

  const isReferenceSelf = model?.locale === referenceModel?.locale

  const defaultValues = useDefaultValues(model, fields)

  const [isEditing, setIsEditing] = useBoolean(false)
  const [confirmState, setConfirmState] = useState<WConfirmProps>()

  const updateModelMutation = useUpdateModelMutation(url)
  const approveModelMutation = useApproveModel(
    url,
    translatedFields as Array<keyof StrapiTranslatableModel>,
  )

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
    refetch()
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

    updateModelMutation.mutateAsync(
      { id, ...body },
      { onSuccess: handleSuccess },
    )
  }

  const onApprove = () => {
    setConfirmState({
      title: t('model.approve'),
      description: t('model.approve-prompt'),
      buttonText: t('model.approve'),
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

  const onCancel = () => {
    resetForm()
    setIsEditing.off()
    setConfirmState(undefined)
  }

  if (!model) return null

  return (
    <>
      {confirmState && (
        <WConfirm
          {...confirmState}
          onCancel={() => setConfirmState(undefined)}
        />
      )}
      <Stack spacing={8} as="form" onSubmit={handleSubmit(onSaveModel)}>
        <FormLocaleSwitcher
          models={model?.localizations as StrapiTranslatableModel[]}
          slug={`translates/${pathname}`}
        />
        {fields.map((field, index) => {
          return (
            <Stack
              key={index}
              spacing={4}
              p={4}
              rounded={'md'}
              shadow={'md'}
              bg={'white'}
            >
              <FormLabel htmlFor={`${model?.id}`} textTransform={'capitalize'}>
                {field?.name as string}
              </FormLabel>
              <Stack direction={{ base: 'column', lg: 'row' }}>
                {!isReferenceSelf && referenceModel && (
                  <HStack w={{ base: 'full', lg: 400 }} align="baseline">
                    <Box as={Flags[referenceModel.locale as StrapiLocale]} />
                    <Text>
                      {
                        referenceModel[
                          field.name as 'title' | 'description' | 'content'
                        ]
                      }
                    </Text>
                  </HStack>
                )}
                <HStack flex={1} align="baseline" w={{ base: 'full', lg: 400 }}>
                  <Box as={Flags[model?.locale as StrapiLocale]} />
                  {field.type === 'markdown' ? (
                    <MdFormItem
                      id={`${model?.id}`}
                      {...(!isEditing && { p: 0 })}
                      key={index}
                      name={field.name as string}
                      label={field?.label}
                      isDisabled={!isEditing}
                      isRequired={field.isRequired}
                      errors={errors}
                      control={control}
                      _disabled={disabledStyle}
                    />
                  ) : (
                    <FormItem
                      id={`${model?.id}`}
                      {...(!isEditing && { p: 0 })}
                      {...(field?.type === 'textarea' && { as: Textarea })}
                      key={index}
                      name={field?.name as string}
                      h={'full'}
                      type={'text'}
                      errors={errors}
                      register={register}
                      isDisabled={!isEditing}
                      _disabled={disabledStyle}
                    />
                  )}
                </HStack>
              </Stack>
            </Stack>
          )
        })}
        {/*  Button group  */}
        <Wrap alignSelf={'end'} justify={'end'}>
          {model.approvalStatus !== 'approved' &&
            (isReferenceSelf ||
              referenceModel?.approvalStatus === 'approved') && (
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
          {!isEditing ? (
            <Button
              onClick={setIsEditing.on}
              leftIcon={<AiOutlineEdit />}
              colorScheme={'primary'}
              fontSize="sm"
            >
              {t('model.edit')}
            </Button>
          ) : (
            <>
              <Button
                onClick={onCancel}
                leftIcon={<MdClose />}
                colorScheme={'gray'}
                fontSize="sm"
              >
                {t('model.cancel')}
              </Button>
              <Button
                type="submit"
                leftIcon={<MdOutlineCheck />}
                colorScheme={'primary'}
                fontSize="sm"
              >
                {t('model.save')}
              </Button>
            </>
          )}
        </Wrap>
      </Stack>
    </>
  )
}
