import {
  Box,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Tooltip,
} from '@chakra-ui/react'
import { Select, Props as SelectProps, GroupBase } from 'chakra-react-select'
import { Control, FieldValues, useController } from 'react-hook-form'
import { TbInfoCircle } from 'react-icons/tb'

import { FormItemProps } from '../FormItem'

type SelectOption = {
  label: string
  value: string
}

export type WSelectProps<T extends FieldValues> = {
  control: Control<T>
} & Omit<FormItemProps<T>, 'register' | 'leftElement'> &
  SelectProps<SelectOption, boolean, GroupBase<SelectOption>>

export type WSelectComponent = <T extends FieldValues>(
  props: WSelectProps<T>,
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
  tooltip,
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
      pos="relative"
    >
      {label && !hideLabel && (
        <Flex align={'center'} mb={1}>
          <FormLabel mb={0} htmlFor={name} fontSize="sm" fontWeight="semibold">
            {label}
          </FormLabel>
          {tooltip && (
            <Tooltip
              placement="top-start"
              bg={'white'}
              fontSize={'xs'}
              color={'black'}
              label={tooltip}
              aria-label={tooltip}
              cursor={'pointer'}
            >
              <Box color="gray.500">
                <TbInfoCircle />
              </Box>
            </Tooltip>
          )}
        </Flex>
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
