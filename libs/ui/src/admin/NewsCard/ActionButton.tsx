import { FC } from 'react'

import { Button, Text } from '@chakra-ui/react'

import { ActionButtonProps } from './types'

const ActionButton: FC<ActionButtonProps> = ({
  isVertical,
  title,
  icon,
  onClick,
}) => {
  return (
    <Button
      aria-label="View"
      onClick={onClick}
      leftIcon={icon}
      {...(isVertical
        ? { iconSpacing: 0 }
        : {
            children: (
              <Text fontWeight={400} fontSize={'12px'}>
                {title}
              </Text>
            ),
          })}
    />
  )
}

export default ActionButton
