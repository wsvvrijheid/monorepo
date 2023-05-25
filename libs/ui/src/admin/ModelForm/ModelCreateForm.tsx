import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Divider,
  HStack,
  Stack,
  useRadioGroup,
} from '@chakra-ui/react'
import { yupResolver } from '@hookform/resolvers/yup'
import slugify from '@sindresorhus/slugify'
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
} from '@wsvvrijheid/types'
import { generateOgImageParams } from '@wsvvrijheid/utils'

import { ModelCreateFormBody } from './ModelCreateFormBody'
import { RadioCard } from './RadioCard'
import { ModelCreateFormProps, Option } from './types'
import { useDefaultValues } from './utils'
import { MasonryGrid } from '../../components'
import { useFileFromUrl } from '../../hooks'
import { LanguageSwitcher } from '../LanguageSwitcher'

export const ModelCreateForm = <T extends StrapiModel>({
  url,
  fields,
  schema,
  model,
  onSuccess,
  hideLanguageSwitcher,
}: ModelCreateFormProps<T>) => {
  const createModelMutation = useCreateModelMutation<
    T,
    StrapiTranslatableCreateInput
  >(url)

  const { locale } = useRouter()

  const postModel = model as unknown as Post

  const imageFile = useFileFromUrl(postModel?.image?.url)
  const capsFile = useFileFromUrl(postModel?.caps?.url)

  const defaultValues = useDefaultValues(model as T, fields)
  const formProps = useForm<InferType<typeof schema>>({
    resolver: yupResolver(schema),
    mode: 'all',
    values: model ? defaultValues : {},
  })
  const { handleSubmit, setValue } = formProps

  useEffect(() => {
    if (imageFile) {
      setValue('image', imageFile)
    } else if (capsFile) {
      setValue('caps', capsFile)
    }
  }, [imageFile, capsFile, setValue])

  const onCreateModel = async (
    data: Record<string, string | number | File | Option | Option[]>,
  ) => {
    console.log('Data', data)
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

  const groupedFields = fields.filter(value => value.group)
  const ungroupedFields = fields.filter(value => !value.group)

  const options = groupedFields.map(field => ({
    value: field.group?.value,
    label: field?.group?.label,
  }))
  const [activeOption, setActiveOption] = useState(options[0]?.value)

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: groupedFields[0]?.group?.value,
    onChange: value => setActiveOption(value),
  })
  const group = getRootProps()

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onCreateModel)}>
      <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
        {!hideLanguageSwitcher && (
          <Box mb={8}>
            <LanguageSwitcher />
          </Box>
        )}
        <ModelCreateFormBody fields={ungroupedFields} formProps={formProps} />

        {groupedFields && (
          <>
            <Divider my={6} />
            <HStack {...group}>
              {options.map(option => {
                const radio = getRadioProps({ value: option.value })

                return (
                  <RadioCard key={option.value} {...radio}>
                    {option.label}
                  </RadioCard>
                )
              })}
            </HStack>
            <ModelCreateFormBody
              fields={groupedFields}
              activeOption={activeOption}
              formProps={formProps}
            />
          </>
        )}
      </MasonryGrid>
      <Button
        alignSelf={'end'}
        leftIcon={<TbPlus />}
        type={'submit'}
        isLoading={createModelMutation.isLoading}
      >
        Create
      </Button>
    </Stack>
  )
}
