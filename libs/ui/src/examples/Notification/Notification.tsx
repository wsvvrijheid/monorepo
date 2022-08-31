import { useState } from 'react'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  CloseButton,
  Flex,
  HStack,
  Stack,
  useDisclosure,
} from '@chakra-ui/react'

import { NotificationProps } from './types'

export const Notification: React.FC<NotificationProps> = ({
  status,
  title,
  description,
  isOpen,
}) => {
  const [display, setDisplay] = useState('')
  const { isOpen: isVisible } = useDisclosure({
    defaultIsOpen: false,
    isOpen,
  })

  return isVisible ? (
    <Alert status={status} display={display}>
      <Flex justifyContent="space-between" alignItems="center" w="full">
        <Stack direction={{ base: 'column', md: 'row' }}>
          <HStack>
            <AlertIcon />
            <AlertTitle>{title}</AlertTitle>
          </HStack>
          <AlertDescription>{description}</AlertDescription>
        </Stack>

        <CloseButton
          alignSelf="flex-start"
          position="relative"
          right={-1}
          top={-1}
          onClick={() => setDisplay('none')}
        />
      </Flex>
    </Alert>
  ) : (
    <></>
  )
}
