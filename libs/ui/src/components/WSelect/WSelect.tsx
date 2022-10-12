import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import { Select, Props as SelectProps, GroupBase } from 'chakra-react-select'
import { Control, FieldValues, useController } from 'react-hook-form'

import { FormItemProps } from '../FormItem'

type SelectOption = {
  label: string
  value: string
}

export type WSelectProps<SelectFormFieldValues extends FieldValues> = {
  control: Control<SelectFormFieldValues>
} & Omit<FormItemProps<SelectFormFieldValues>, 'register' | 'leftElement'> &
  SelectProps<SelectOption, boolean, GroupBase<SelectOption>>

export type WSelectComponent = <SelectFormFieldValues extends FieldValues>(
  props: WSelectProps<SelectFormFieldValues>,
) => JSX.Element

export const WSelect: WSelectComponent = ({
  control,
  name,
  label,
  hideLabel,
  errors,
  isRequired,
  helperText,
  placeholder,
  options,
  ...rest
}) => {
  const { field } = useController({
    name,
    control,
  })

  const errorMessage = errors?.[name]?.['message'] as unknown as string

  return (
    <FormControl
      isInvalid={Boolean(errors?.[name])}
      isRequired={isRequired}
      w="full"
    >
      {label && !hideLabel && (
        <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight="semibold">
          {label}
        </FormLabel>
      )}

      <Select<SelectOption, boolean, GroupBase<SelectOption>>
        options={options}
        placeholder={placeholder || label}
        {...field}
        {...rest}
      />

      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
