import {
  Container as ChakraContainer,
  ContainerProps,
} from '@chakra-ui/react'
import { FC } from 'react'

export const Container: FC<ContainerProps> = (props) => {
  return <ChakraContainer maxW="container.xl" {...props} />
}
