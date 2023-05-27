import { ComponentProps, FC, PropsWithChildren } from 'react'

import HTMLFlipBook from 'react-pageflip'

const FlipBook: FC<PropsWithChildren<ComponentProps<typeof HTMLFlipBook>>> = ({
  children,
  ...rest
}) => {
  return <HTMLFlipBook {...rest}>{children}</HTMLFlipBook>
}

export default FlipBook
