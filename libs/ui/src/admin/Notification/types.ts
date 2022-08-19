import { AlertStatus } from '@chakra-ui/react'

export type NotificationProps = {
  status: AlertStatus
  title: string
  description: string
  isOpen: boolean
}
