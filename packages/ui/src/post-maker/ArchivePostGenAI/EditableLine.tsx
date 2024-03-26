import {
  EditableProps as EditablePropsType,
  Editable,
  EditablePreview,
  EditableTextarea,
  HStack,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  useColorModeValue,
} from '@chakra-ui/react'
import { debounce } from 'lodash'
import { FaInfo, FaX } from 'react-icons/fa6'

import { OgImageParams } from '@fc/types'

import { Caps } from '../../components'

export type EditableProps = Pick<
  EditablePropsType,
  'defaultValue' | 'onChange' | 'isDisabled'
> & {
  onDelete?: () => void
  isDescription?: boolean
  imageParams?: OgImageParams
}

export const EditableLine: React.FC<EditableProps> = ({
  defaultValue,
  onChange = () => {},
  onDelete,
  isDescription = false,
  isDisabled = false,
  imageParams = {},
}) => {
  const debouncedOnChange = debounce(onChange, 700)

  return (
    <HStack
      _hover={{ backgroundColor: useColorModeValue('gray.100', 'gray.700') }}
      px={2}
      rounded={'md'}
      pl={isDescription ? 0 : 4}
    >
      <IconButton
        isDisabled={isDisabled}
        aria-label="delete"
        variant={'ghost'}
        size={'xs'}
        icon={<FaX />}
        onClick={onDelete}
      />
      {isDescription && (
        <Popover trigger="hover" placement="bottom-start" isLazy>
          <PopoverTrigger>
            <IconButton
              variant={'ghost'}
              size="xs"
              aria-label={''}
              icon={<FaInfo />}
            />
          </PopoverTrigger>
          <PopoverContent
            width={650}
            p={0}
            m={0}
            background={'white'}
            borderRadius={'md'}
            overflow={'hidden'}
          >
            <Caps
              m={0}
              p={0}
              width={650}
              imageParams={{
                text: defaultValue,
                scale: 1,
                ...imageParams,
              }}
            />
          </PopoverContent>
        </Popover>
      )}
      <Editable
        flexGrow={1}
        defaultValue={defaultValue}
        onChange={debouncedOnChange}
        isDisabled={isDisabled}
      >
        <EditablePreview
          py={1}
          px={2}
          fontWeight={isDescription ? 'bold' : 'normal'}
        />
        <EditableTextarea
          fontWeight={isDescription ? 'bold' : 'normal'}
          px={1}
          py={2}
          minWidth={'90%'}
          background={'gray.100'}
          borderRadius={'md'}
        />
      </Editable>
    </HStack>
  )
}
