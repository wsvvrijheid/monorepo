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

const Notification: React.FC<NotificationProps> = ({
  status,
  title,
  description,
  isOpen,
}) => {
  const { isOpen: isVisible, onClose } = useDisclosure({
    defaultIsOpen: false,
    isOpen,
  })

  return isVisible ? (
    <Alert status={status}>
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
          onClick={onClose}
        />
      </Flex>
    </Alert>
  ) : (
    <></>
  )
}

export default Notification
