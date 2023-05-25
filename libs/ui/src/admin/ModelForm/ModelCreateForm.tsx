import { useEffect, useState } from 'react'

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  Switch,
  Textarea,
  useBoolean,
  useRadio,
  useRadioGroup,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
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
  hideLanguageSwitcher,
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
    data: Record<string, string | number | File | Option | Option[]>,
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

  const options = ['Otomatik Caps', 'video', 'caps yukle']
  const [media, setMedia] = useState('Otomatik Caps')

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'framework',
    defaultValue: 'Otomatik Caps',
    onChange: value => setMedia(value),
  })

  const group = getRootProps()
  console.log('options', media)

  return (
    <Stack as={'form'} onSubmit={handleSubmit(onCreateModel)}>
      <MasonryGrid cols={[1, 1, 1, 2]} columnGap={8} rowGap={4}>
        {!hideLanguageSwitcher && (
          <Box mb={8}>
            <LanguageSwitcher />
          </Box>
        )}
        {fields.map((field, index) => {
          const label = field.label || capitalize(field.name as string)

          if (field.type === 'file') {
            return (
              <>
                {media === 'Otomatik Caps' && field.name === 'image' && (
                  <>
                    <HStack {...group}>
                      {options.map(value => {
                        const radio = getRadioProps({ value })

                        return (
                          <RadioCard key={value} {...radio}>
                            {value}
                          </RadioCard>
                        )
                      })}
                    </HStack>

                    <FormControl
                      isInvalid={Boolean(errors?.[field.name])}
                      key={index}
                      isRequired={field.isRequired}
                      zIndex={0}
                    >
                      <FormLabel>{label}</FormLabel>
                      <ModelImage
                        isEditing={!!postModel?.video?.url}
                        model={model as T}
                        setValue={setValue}
                        isChangingImage={isChangingImage}
                        setIsChangingImage={setIsChangingImage}
                      />
                      <FormErrorMessage>
                        {errors?.[field.name]?.message as string}
                      </FormErrorMessage>
                    </FormControl>
                  </>
                )}
                {media === 'video' && field.name === 'video' && (
                  <>
                    {' '}
                    <HStack {...group}>
                      {options.map(value => {
                        const radio = getRadioProps({ value })

                        return (
                          <RadioCard key={value} {...radio}>
                            {value}
                          </RadioCard>
                        )
                      })}{' '}
                    </HStack>
                    <Tabs>
                      <TabList>
                        <Tab>Upload Video</Tab>
                        <Tab>Video Url</Tab>
                      </TabList>

                      <TabPanels>
                        <TabPanel>
                          <FormControl
                            isInvalid={Boolean(errors?.[field.name])}
                            key={index}
                            isRequired={field.isRequired}
                            zIndex={0}
                          >
                            <FormLabel>{label}</FormLabel>
                            <ModelImage
                              isEditing={!!postModel?.video?.url}
                              model={model as T}
                              setValue={setValue}
                              isChangingImage={isChangingImage}
                              setIsChangingImage={setIsChangingImage}
                            />
                            <FormErrorMessage>
                              {errors?.[field.name]?.message as string}
                            </FormErrorMessage>
                          </FormControl>
                        </TabPanel>
                        <TabPanel>
                          {
                            <FormItem
                              key={index}
                              name={field.name as string}
                              type={'Textarea'}
                              label={label}
                              isRequired={field.isRequired}
                              errors={errors}
                              register={register}
                              _disabled={disabledStyle}
                            />
                          }
                        </TabPanel>
                      </TabPanels>
                    </Tabs>
                  </>
                )}
                {media === 'caps yukle' && field.name === 'caps' && (
                  <>
                    <HStack {...group}>
                      {options.map(value => {
                        const radio = getRadioProps({ value })

                        return (
                          <RadioCard key={value} {...radio}>
                            {value}
                          </RadioCard>
                        )
                      })}
                    </HStack>
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
                  </>
                )}
              </>
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

          if (field.type === 'number-input') {
            return (
              <Flex align={'center'} mb={1}>
                <FormControl>
                  <FormLabel mb={0} fontSize="sm" fontWeight={600}>
                    {label}
                  </FormLabel>
                  <NumberInput
                    maxW={120}
                    onChange={value => setValue(field.name as string, value)}
                    size="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>

                  <FormErrorMessage>
                    {errors[field?.name as string]?.message as string}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
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
        type={'submit'}
        isLoading={createModelMutation.isLoading}
      >
        Create
      </Button>
    </Stack>
  )
}
export const RadioCard = (props: any) => {
  const { getInputProps, getRadioProps } = useRadio(props)

  const input = getInputProps()
  const checkbox = getRadioProps()

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'teal.600',
          color: 'white',
          borderColor: 'teal.600',
        }}
        _focus={{
          boxShadow: 'outline',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  )
}
