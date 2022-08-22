import { ComponentProps, FC, ReactNode } from 'react'

import { Box, BoxProps } from '@chakra-ui/react'

export type ExampleProps = {
  title: string
  children: ReactNode
} & BoxProps

export const Example: FC<ExampleProps> = ({ title, ...rest }) => {
  return <Box {...rest}>{title}</Box>
}

export type NewExampleProps = {
  description: string
  title: number
  w: string
} & Omit<ExampleProps, 'title'>

export type NewExampleProps = {
  description: string
  title: ExampleProps['title']
}

export type NewExampleProps = {
  description: string
  title: ComponentProps<typeof Example>['title']
}

export type NewExampleProps = {
  description: string
} & Pick<ComponentProps<typeof Example>, 'title'>
