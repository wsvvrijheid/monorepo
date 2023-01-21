import { useEffect, useMemo } from 'react'

import {
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
import { useCreateModelMutation } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
  Hashtag,
  Post,
  StrapiLocale,
  StrapiModel,
  StrapiTranslatableCreateInput,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { InferType } from 'yup'

import { ModelImage } from './ModelImage'
import { ModelSelect } from './ModelSelect'
import { ModelCreateFormProps, Option } from './types'
import { FormItem, MasonryGrid, MdFormItem } from '../../components'
import { useFileFromUrl } from '../../hooks'

export const ModelCreateForm = <T extends StrapiModel>({
  url,
  fields,
  schema,
  model,
  onSuccess,
}: ModelCreateFormProps<T>) => {
  const { user } = useAuthSelector()

  const createModelMutation = useCreateModelMutation<
    T,
    StrapiTranslatableCreateInput
  >(url)

  const { locale } = useRouter()

  const hashtagModel = model as unknown as Hashtag
  const postModel = model as unknown as Post
  const imageFile = useFileFromUrl(postModel?.image?.url)
  const [isChangingImage, setIsChangingImage] = useBoolean(
    postModel?.image ? false : true,
  )
  const defaultValues = useMemo(() => {
    const defaults = {} as any

    fields?.forEach(field => {
      switch (field.name) {
        case 'mentions':
          defaults.mentions =
            hashtagModel?.mentions?.map(m => ({
              label: m.username,
              value: m.id.toString(),
            })) || []
          break
        case 'title':
          defaults.title = postModel?.title
          break
        case 'description':
          defaults.description = postModel?.description
          break
        case 'hashtag':
          defaults.hashtag = {
            label: postModel?.hashtag?.title,
            value: postModel?.hashtag?.id.toString(),
          }
          break
        default:
          defaults[field.name] = model?.[field.name as keyof T] || undefined
          break
      }
    })

    return defaults
  }, [model, fields, imageFile])

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: model ? defaultValues : '',
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

    const slug = slugify(body.title as string)
    const creator = url === 'api/posts' ? user?.id : undefined
    const recommender = url === 'api/recommended-topics' ? user?.id : undefined

    createModelMutation.mutate(
      {
        ...body,
        slug,
        locale: locale as StrapiLocale,
        creator,
        recommender,
      } as StrapiTranslatableCreateInput,
      {
        onSuccess: () => {
          onSuccess?.()
          setValue('image', undefined)
        },
      },
    )
  }

  const disabledStyle = {
    borderColor: 'transparent',
    _hover: { borderColor: 'transparent' },
    color: 'gray.500',
  }

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onCreateModel)}>
      <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
        {fields.map((field, index) => {
          const label = field.label || capitalize(field.name as string)

          if (field.type === 'file') {
            return (
              <FormControl
                isInvalid={Boolean((errors as any)?.[field.name])}
                key={index}
                isRequired={field.isRequired}
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
                  {(errors as any)?.[field.name]?.message}
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
                fields={field.fields}
                label={label}
                errors={errors}
                control={control}
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
