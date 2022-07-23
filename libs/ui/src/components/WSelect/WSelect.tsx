import { FC, RefAttributes } from 'react'

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
} from '@chakra-ui/react'
import {
  Select,
  Props as SelectProps,
  GroupBase,
  SelectInstance,
} from 'chakra-react-select'
import { Control, useController } from 'react-hook-form'

import { FormItemProps } from '../FormItem'

type SelectOption = {
  label: string
  value: string
}

export type WSelectProps = {
  control: Control
} & Omit<FormItemProps, 'register' | 'leftElement'> &
  SelectProps<SelectOption, boolean, GroupBase<SelectOption>> &
  RefAttributes<SelectInstance<SelectOption, boolean, GroupBase<SelectOption>>>

export const WSelect: FC<WSelectProps> = ({
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
        <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight={600}>
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
