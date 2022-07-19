import { FC, ReactNode } from 'react'

import {
  Box,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  useBoolean,
  useMergeRefs,
} from '@chakra-ui/react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export type FormItemProps = InputProps & {
  name: string
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: ReactNode
  hideLabel?: boolean
  errors: FieldErrors<FieldValues>
  register: UseFormRegister<FieldValues>
}

export const FormItem: FC<FormItemProps> = forwardRef(
  (
    {
      name,
      type,
      as,
      leftElement,
      label,
      helperText,
      errors,
      register,
      isRequired,
      hideLabel,
      ...rest
    },
    formItemRef,
  ) => {
    const [isOpen, setIsOpen] = useBoolean()
    const Tag = as || Input

    const errorMessage = errors?.[name]?.['message'] as unknown as string

    const { ref: registerRef, ...registerRest } = register(name)

    const ref = useMergeRefs(formItemRef, registerRef)

    return (
      <FormControl isInvalid={Boolean(errors?.[name])} isRequired={isRequired}>
        {label && !hideLabel && (
          <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight={600}>
            {label}
          </FormLabel>
        )}
        <InputGroup>
          {leftElement && (
            <InputLeftElement pointerEvents="none">
              <Box color="gray.300">{leftElement}</Box>
            </InputLeftElement>
          )}
          {type === 'password' && (
            <InputRightElement>
              <IconButton
                variant="link"
                aria-label={isOpen ? 'Mask password' : 'Reveal password'}
                icon={isOpen ? <HiEyeOff /> : <HiEye />}
                onClick={setIsOpen.toggle}
              />
            </InputRightElement>
          )}

          <Tag
            ref={ref}
            id={name}
            placeholder={label}
            {...registerRest}
            {...rest}
          />
        </InputGroup>
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    )
  },
)
