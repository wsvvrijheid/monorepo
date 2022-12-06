import { ForwardedRef, ReactNode, useEffect, useRef } from 'react'

import {
  Box,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  forwardRef,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputProps,
  InputRightElement,
  Spacer,
  Text,
  Tooltip,
  useBoolean,
  useMergeRefs,
} from '@chakra-ui/react'
import { FieldValues, Path, useFormContext } from 'react-hook-form'
import { BiUndo } from 'react-icons/bi'
import { FaSave } from 'react-icons/fa'
import { HiEye, HiEyeOff } from 'react-icons/hi'
import { MdOutlineRestore } from 'react-icons/md'

export type EditablFormItemProps<T extends FieldValues> = InputProps & {
  name: Path<T>
  label?: string
  helperText?: string
  leftElement?: ReactNode
  hideLabel?: boolean
  editing?: boolean
  onSave: (name: Path<T>) => Promise<unknown>
}

function EditableFormItemBase<T extends FieldValues>(
  props: EditablFormItemProps<T>,
  formItemRef: ForwardedRef<HTMLInputElement | HTMLTextAreaElement>,
) {
  const {
    name,
    type,
    as,
    leftElement,
    label,
    helperText,
    isRequired,
    hideLabel,
    placeholder,
    editing = true,
    onSave,
    ...rest
  } = props

  const [isEditing, setIsEditing] = useBoolean(!!editing)
  const [isOpen, setIsOpen] = useBoolean(false)
  const [showButtons, setShowButtons] = useBoolean(false)

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<T>()

  const Tag = as || Input

  const errorMessage = errors?.[name]?.['message'] as unknown as string
  const value = watch?.(name)

  const initialValue = useRef(value)
  const defaultValue = useRef(value)
  const { ref: registerRef, ...registerRest } = register(name)
  const ref = useMergeRefs(formItemRef, registerRef)

  useEffect(() => {
    if (value && defaultValue.current.trim() !== value.trim()) {
      setShowButtons.on()
    }
  }, [value, setShowButtons])

  const handleSave = async () => {
    setIsEditing.off()
    setShowButtons.off()
    await onSave(name)
    defaultValue.current = value
  }

  const onUndo = () => {
    setShowButtons.off()
    setValue(name, defaultValue.current)
  }

  const onReset = () => {
    setShowButtons.off()
    setValue(name, initialValue.current)
  }

  return (
    <FormControl isInvalid={Boolean(errors?.[name])} isRequired={isRequired}>
      <HStack w="full">
        {label && !hideLabel && (
          <FormLabel mb={1} htmlFor={name} fontSize="sm" fontWeight="semibold">
            {label}
          </FormLabel>
        )}
        <Spacer />
        {showButtons && (
          <ButtonGroup spacing={0} variant={'link'} size={'sm'} isAttached>
            <Tooltip
              hasArrow
              bg={'yellow.500'}
              placement={'top-end'}
              label={
                <Box>
                  <Text fontWeight={600}>Reset to initial</Text>
                  <Text>{initialValue.current}</Text>
                </Box>
              }
            >
              <IconButton
                colorScheme={'blackAlpha'}
                rounded={'lg'}
                aria-label="Default value"
                icon={<MdOutlineRestore />}
                onClick={onReset}
              />
            </Tooltip>
            <Tooltip
              hasArrow
              placement={'top-end'}
              label={
                <Box>
                  <Text fontWeight={600}>Undo</Text>
                  <Text>{defaultValue.current}</Text>
                </Box>
              }
            >
              <IconButton
                colorScheme={'blackAlpha'}
                rounded={'lg'}
                aria-label="Default value"
                icon={<BiUndo />}
                onClick={onUndo}
              />
            </Tooltip>
            <Tooltip
              bg={'green.500'}
              hasArrow
              placement={'top-end'}
              label={'Save changes'}
            >
              <IconButton
                colorScheme={'green'}
                rounded={'lg'}
                aria-label="Save"
                icon={<FaSave />}
                onClick={handleSave}
              />
            </Tooltip>
          </ButtonGroup>
        )}
      </HStack>
      <InputGroup>
        {leftElement && (
          <InputLeftElement pointerEvents="none">
            <Box color="gray.300">{leftElement}</Box>
          </InputLeftElement>
        )}
        {type === 'password' && (
          <InputRightElement>
            <IconButton
              rounded={'full'}
              variant="ghost"
              size={'sm'}
              aria-label={isOpen ? 'Mask password' : 'Reveal password'}
              icon={isOpen ? <HiEyeOff /> : <HiEye />}
              onClick={setIsOpen.toggle}
            />
          </InputRightElement>
        )}

        <Tag
          ref={ref}
          id={name}
          pl={0}
          type={type === 'password' ? (isOpen ? 'text' : 'password') : type}
          placeholder={placeholder || label}
          onFocus={setIsEditing.on}
          transition="all 0.3s"
          _focus={{
            pl: 2,
          }}
          {...(isEditing && {
            borderColor: 'transparent',
            _hover: { borderColor: 'gray.200', pl: 2 },
          })}
          {...registerRest}
          {...rest}
        />
      </InputGroup>
      <FormErrorMessage>{errorMessage}</FormErrorMessage>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}

export const EditableFormItem = forwardRef(EditableFormItemBase)
