import { HStack, Icon, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { ActionButtonProps } from './types'

const ActionButton: FC<ActionButtonProps> = ({
  isVertical,
  title,
  icon,
  onClick,
}) => {
  return (
    <HStack
      as="button"
      onClick={onClick}
      fontSize={isVertical ? '20px' : '12px'}
      color={'blue.500'}
    >
      <Icon as={icon as any} size={isVertical ? '20px' : '12px'} />
      {!isVertical && <Text fontSize={'12px'}>{title}</Text>}
    </HStack>
  )
}

export default ActionButton
