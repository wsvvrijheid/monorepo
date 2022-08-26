import { FC, ReactNode } from 'react'

import { Flex, useBreakpointValue } from '@chakra-ui/react'
import Masonry from 'react-masonry-css'

export interface MasonryGridProps {
  gap?:
    | number
    | {
        base?: number
        xs?: number
        sm?: number
        md?: number
        lg?: number
        xl?: number
        '2xl'?: number
      }
  cols?: Array<number>
  children: ReactNode
}

export const MasonryGrid: FC<MasonryGridProps> = ({
  children,
  gap = 4,
  cols = [1, 2, 3, 4],
}) => {
  const breakpointCols = useBreakpointValue(cols)
  const ml = typeof gap === 'number' ? -gap : gap
  return (
    <Flex
      as={Masonry}
      ml={ml}
      breakpointCols={breakpointCols}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
      sx={{
        '& .masonry-grid_column': {
          '&:not(:nth-of-type(1))': {
            bgClip: 'padding-box',
            pl: { base: cols[0] === 1 ? 0 : gap, lg: gap },
          },

          '& > div': {
            mb: gap,
          },
        },
      }}
    >
      {children}
    </Flex>
  )
}
