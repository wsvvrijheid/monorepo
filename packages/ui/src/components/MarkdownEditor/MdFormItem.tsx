import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { useTranslation } from 'next-i18next'
import { Control, FieldValues, useController } from 'react-hook-form'

import { MarkdownEditor } from '.'
import { I18nNamespaces } from '../../../@types/i18next'
import { FormItemProps } from '../FormItem'

type MdFormItemProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'>

export const MdFormItem = <T extends FieldValues>({
  control,
  name,
  label,
  hideLabel,
  errors,
  isRequired,
  helperText,
  isDisabled,
  placeholder,
  ...rest
}: MdFormItemProps<T>) => {
  const {
    field: { onChange, value, ...fieldProps },
  } = useController<T>({
    name,
    control,
  })

  const { t: tModel } = useTranslation('model')

  const errorMessage = errors?.[name]?.['message'] as unknown as string

  return (
    <FormControl
      isInvalid={Boolean(errors?.[name])}
      isRequired={isRequired}
      w="full"
      pos="relative"
      flex={1}
      display={'flex'}
      flexDir={'column'}
    >
      {label && !hideLabel && (
        <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight={600}>
          {tModel(name as keyof I18nNamespaces['model'], {
            defaultValue: label,
          })}
        </FormLabel>
      )}

      <MarkdownEditor
        placeholder={tModel(name as keyof I18nNamespaces['model'], {
          defaultValue: placeholder || label,
        })}
        onChange={(value: { text: string; html: string }) =>
          onChange(value.text)
        }
        value={value}
        isDisabled={isDisabled}
        {...fieldProps}
        {...rest}
      />

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
