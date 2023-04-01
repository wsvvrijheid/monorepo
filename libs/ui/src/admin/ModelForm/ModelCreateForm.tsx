import { useEffect } from 'react'

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
  useBoolean,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { InferType } from 'yup'

import { useCreateModelMutation } from '@wsvvrijheid/services'
import {
  Post,
  PostCreateInput,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableCreateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { generateOgImageParams } from '@wsvvrijheid/utils'

import { ModelImage } from './ModelImage'
import { ModelSelect } from './ModelSelect'
import { ModelCreateFormProps, Option } from './types'
import { useDefaultValues } from './utils'
import { FormItem, MasonryGrid, MdFormItem } from '../../components'
import { useFileFromUrl } from '../../hooks'
import { LanguageSwitcher } from '../LanguageSwitcher'

export const ModelCreateForm = <T extends StrapiModel>({
  url,
  fields,
  schema,
  model,
  onSuccess,
}: ModelCreateFormProps<T>) => {
  const createModelMutation = useCreateModelMutation<
    T,
    StrapiTranslatableCreateInput
  >(url)

  const { locale } = useRouter()

  const postModel = model as unknown as Post

  const imageFile = useFileFromUrl(postModel?.image?.url)

  const [isChangingImage, setIsChangingImage] = useBoolean(
    postModel?.image ? false : true,
  )
  const defaultValues = useDefaultValues(model as T, fields)

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: model ? defaultValues : {},
  })

  useEffect(() => {
    if (imageFile) {
      setValue('image', imageFile)
    }
  }, [imageFile, setValue])

  const onCreateModel = async (
    data: Record<string, string | File | Option | Option[]>,
  ) => {
    const body = Object.entries(data).reduce((acc, [key, value]) => {
      if (value === undefined || !fields.some(f => f.name === key)) {
        return acc
      }

      // Multiple select
      if (Array.isArray(value)) {
        return {
          ...acc,
          [key]: value.map(v => v.value),
        }
      }

      // Single select
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
    }, {} as StrapiTranslatableCreateInput)

    const slug = body.title && slugify(body.title)

    const bodyData = {
      ...body,
      slug,
      publishedAt: url !== 'api/recommended-topics' ? null : new Date(),
      locale: locale as StrapiLocale,
    } as StrapiTranslatableCreateInput

    if (url === 'api/posts') {
      const imageProps = generateOgImageParams()
      const postBody = bodyData as PostCreateInput
      postBody.imageParams = imageProps
    }

    createModelMutation.mutate(bodyData, {
      onSuccess: () => {
        onSuccess?.()
        setValue('image', undefined)
      },
    })
  }

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
  }

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onCreateModel)}>
      <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
        <Box mb={8}>
          <LanguageSwitcher />
        </Box>
        {fields.map((field, index) => {
          const label = field.label || capitalize(field.name as string)

          if (field.type === 'file') {
            return (
              <FormControl
                isInvalid={Boolean(errors?.[field.name])}
                key={index}
                isRequired={field.isRequired}
                zIndex={0}
              >
                <FormLabel>{label}</FormLabel>
                <ModelImage
                  isEditing={!!postModel?.image?.url}
                  model={model as T}
                  setValue={setValue}
                  isChangingImage={isChangingImage}
                  setIsChangingImage={setIsChangingImage}
                />

                <FormErrorMessage>
                  {errors?.[field.name]?.message as string}
                </FormErrorMessage>
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
                label={label}
                errors={errors}
                control={control}
                zIndex={1}
              />
            )
          }

          if (field.type === 'markdown') {
            return (
              <MdFormItem
                key={index}
                name={field.name as string}
                label={label}
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
              _disabled={disabledStyle}
            />
          )
        })}
      </MasonryGrid>
      <Button
        alignSelf={'end'}
        leftIcon={<TbPlus />}
        colorScheme={'primary'}
        type={'submit'}
        isLoading={createModelMutation.isLoading}
      >
        Create
      </Button>
    </Stack>
  )
}
