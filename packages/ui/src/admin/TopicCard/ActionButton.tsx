import { FC } from 'react'

import { Box, Button } from '@chakra-ui/react'

import { ActionButtonProps } from './index'

export const ActionButton: FC<ActionButtonProps> = ({
  icon,
  onClick,
  title,
  ...rest
}) => {
  return (
    <Button
      aria-label={title}
      onClick={onClick}
      leftIcon={icon}
      iconSpacing={{ base: 0, lg: 2 }}
      {...rest}
    >
      <Box as="span" display={{ base: 'none', xl: 'inline' }}>
        {title}
      </Box>
    </Button>
  )
}
