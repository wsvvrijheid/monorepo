import { FC } from 'react'

import { Button } from '@chakra-ui/react'

import { MutationButtonProps } from './index'

export const MutationButton: FC<MutationButtonProps> = ({
  title,
  icon,
  colorScheme,
  variant,
  onClick,
}) => {
  return (
    <Button
      aria-label={title}
      onClick={onClick}
      leftIcon={icon}
      children={title}
      variant={variant}
      colorScheme={colorScheme}
      fontWeight="medium"
      size={'sm'}
    />
  )
}
