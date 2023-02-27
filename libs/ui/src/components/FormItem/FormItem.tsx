import { ReactNode, RefAttributes, ReactElement } from 'react'

import {
  Box,
  Flex,
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
  Tooltip,
  useBoolean,
  useMergeRefs,
} from '@chakra-ui/react'
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { TbInfoCircle } from 'react-icons/tb'

export type FormItemProps<T extends FieldValues> = InputProps & {
  name: Path<T>
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: ReactNode
  hideLabel?: boolean
  tooltip?: string
  errors: Partial<FieldErrorsImpl<T>>
  register: UseFormRegister<T>
}

export type FormItemComponent = <FormValues extends FieldValues>(
  props: FormItemProps<FormValues> &
    RefAttributes<HTMLInputElement | HTMLTextAreaElement>,
) => ReactElement

export const FormItem: FormItemComponent = forwardRef(
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
      tooltip,
      ...rest
    },
    formItemRef,
  ) => {
    const [isOpen, setIsOpen] = useBoolean(false)

    const Tag = as || Input
    const errorMessage = errors?.[name]?.['message'] as unknown as string

    const { ref: registerRef, ...registerRest } = register(name)
    const ref = useMergeRefs(formItemRef, registerRef)

    return (
      <FormControl isInvalid={Boolean(errors?.[name])} isRequired={isRequired}>
        {label && !hideLabel && (
          <Flex align={'center'} mb={1}>
            <FormLabel
              mb={0}
              htmlFor={name}
              fontSize="sm"
              fontWeight="semibold"
            >
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
            type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
            placeholder={label}
            _placeholder={{ color: 'gray.300' }}
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
