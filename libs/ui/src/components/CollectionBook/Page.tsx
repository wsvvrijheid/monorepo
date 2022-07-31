import { forwardRef, PropsWithChildren } from 'react'

import { Center, CenterProps } from '@chakra-ui/react'

interface PageProps extends PropsWithChildren, CenterProps {}

export const Page = forwardRef<HTMLDivElement, PageProps>(function Page(
  props,
  ref,
) {
  return (
    <Center ref={ref} rounded="md" p={8} overflow="auto" {...props}>
      {props.children}
    </Center>
  )
})
