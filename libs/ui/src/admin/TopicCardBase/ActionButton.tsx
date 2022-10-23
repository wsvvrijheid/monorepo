import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { ActionButtonProps } from './index'

export const ActionButton: FC<ActionButtonProps> = ({
  isVertical,
  title,
  icon,
  onClick,
  ...rest
}) => {
  return (
    <Button
      aria-label={title}
      onClick={onClick}
      leftIcon={icon}
      {...(isVertical
        ? { iconSpacing: 0 }
        : {
            children: title,
          })}
      {...rest}
    />
  )
}
