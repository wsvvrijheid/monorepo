import { ReactElement, ReactNode, RefAttributes, useRef } from 'react'

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
  usePrevious,
} from '@chakra-ui/react'
import {
  FieldErrorsImpl,
  FieldValues,
  Path,
  UseFormRegister,
  UseFormWatch,
} from 'react-hook-form'
import { HiEye, HiEyeOff } from 'react-icons/hi'

export type FormItemProps<T extends FieldValues> = InputProps & {
  name: Path<T>
  label?: string
  placeholder?: string
  helperText?: string
  leftElement?: ReactNode
  hideLabel?: boolean
  errors: Partial<FieldErrorsImpl<T>>
  register: UseFormRegister<T>
  editMode?: boolean
  editing?: boolean
  watch?: UseFormWatch<T>
  onSave?: (name: Path<T>) => void
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
      editMode,
      editing = true,
      onSave,
      watch,
      ...rest
    },
    formItemRef,
  ) => {
    const [isEditing, setIsEditing] = useBoolean(editing)
    const [isOpen, setIsOpen] = useBoolean(false)

    const Tag = as || Input
    const errorMessage = errors?.[name]?.['message'] as unknown as string
    const { ref: registerRef, onBlur, ...registerRest } = register(name)
    const ref = useMergeRefs(formItemRef, registerRef)

    const value = watch?.(name)
    const firstValue = useRef(value)
    const previousValue = usePrevious(value)

    const handleBlur = (e: any) => {
      if (editMode) {
        setIsEditing.off()

        if (
          onSave &&
          previousValue &&
          value &&
          previousValue.trim() !== value.trim() &&
          value.trim() !== firstValue.current?.trim()
        ) {
          onSave?.(name)
        }
      }
      onBlur(e)
    }

    return (
      <FormControl
        isInvalid={Boolean(errors?.[name])}
        isRequired={isRequired}
        role="group"
      >
        {label && !hideLabel && (
          <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight="semibold">
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
            type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
            placeholder={label}
            onBlur={handleBlur}
            {...(editMode && {
              borderColor: 'transparent',
              _groupHover: { borderColor: 'gray.200' },
            })}
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
