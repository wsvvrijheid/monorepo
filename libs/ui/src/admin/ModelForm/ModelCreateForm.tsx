import {
  Button,
  FormControl,
  FormLabel,
  SimpleGrid,
  Textarea,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
import { useCreateModelMutation } from '@wsvvrijheid/services'
import {
  StrapiLocale,
  StrapiTranslatableCreateInput,
  StrapiTranslatableModel,
  StrapiUrl,
} from '@wsvvrijheid/types'
import { capitalize } from 'lodash'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TbPlus } from 'react-icons/tb'
import { InferType } from 'yup'

import { FilePicker, FormItem } from '../../components'
import { ModelSelect } from './ModelSelect'
import { ModelCreateFormProps, Option } from './types'

export const ModelCreateForm = <
  T extends StrapiTranslatableModel,
  D extends StrapiTranslatableCreateInput,
>({
  url,
  fields,
  schema,
  onSuccess,
}: ModelCreateFormProps<D>) => {
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
    }, {} as StrapiTranslatableCreateInput)

    const slug = slugify(body.title)

    createModelMutation.mutate(
      { ...body, slug, locale: locale as StrapiLocale },
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

  return (
    <SimpleGrid
      rowGap={4}
      columnGap={8}
      columns={{ base: 1, lg: 2 }}
      as={'form'}
      onSubmit={handleSubmit(onCreateModel)}
    >
      {fields.map((field, index) => {
        const label = field.label || capitalize(field.name as string)

        if (field.type === 'file') {
          return (
            <FormControl key={index} isRequired={field.isRequired}>
              <FormLabel>{label}</FormLabel>
              <FilePicker setFiles={files => setValue('image', files[0])} />
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

      <Button
        alignSelf={'end'}
        leftIcon={<TbPlus />}
        colorScheme={'primary'}
        type={'submit'}
        isLoading={createModelMutation.isLoading}
      >
        Create
      </Button>
    </SimpleGrid>
  )
}
