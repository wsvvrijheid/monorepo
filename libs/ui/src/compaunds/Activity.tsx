import { FC } from 'react'

import { Box } from '@chakra-ui/react'

interface ActivityProps {
  title?: string
}

export const Activity: FC<ActivityProps> = ({ title }) => {
  return <Box>{title}</Box>
}
