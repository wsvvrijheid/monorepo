import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Stack,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateModelMutation } from '@wsvvrijheid/services'
import { useAuthSelector } from '@wsvvrijheid/store'
import {
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

import { FilePicker, FormItem, MasonryGrid } from '../../components'
import { ModelSelect } from './ModelSelect'
import { ModelCreateFormProps, Option } from './types'

export const ModelCreateForm = <T extends StrapiModel>({
  url,
  fields,
  schema,
  onSuccess,
}: ModelCreateFormProps<T>) => {
  const { user } = useAuthSelector()

  const createModelMutation = useCreateModelMutation<
    T,
    StrapiTranslatableCreateInput
  >(url)

  const { locale } = useRouter()

  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    setValue,
  } = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  })

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

    const slug = slugify(body.title)
    const creator = url === 'api/posts' ? user?.id : undefined

    createModelMutation.mutate(
      { ...body, slug, locale: locale as StrapiLocale, creator },
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
    color: 'blackAlpha.500',
  }

  console.log('errors', errors)

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
                <FilePicker setFiles={files => setValue('image', files[0])} />
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
