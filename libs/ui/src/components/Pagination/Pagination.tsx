import { FC } from 'react'

import { Button, ButtonGroup, IconButton } from '@chakra-ui/react'
import { FaChevronRight, FaChevronLeft } from 'react-icons/fa'

export interface PaginationProps {
  pageCount: number
  currentPage: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = ({
  pageCount,
  currentPage,
  onPageChange,
}) => {
  if (pageCount <= 1) return null

  return (
    <ButtonGroup isAttached colorScheme="primary">
      <IconButton
        disabled={currentPage === 1}
        aria-label="Previous page"
        variant="outline"
        icon={<FaChevronLeft />}
        onClick={() => onPageChange(currentPage - 1)}
      />
      {Array.from({ length: pageCount }, (v, index) => {
        const page = index + 1

        return (
          <Button
            borderRightWidth={page === pageCount ? 1 : 0}
            onClick={() => onPageChange(page)}
            variant={
              page === currentPage || (page === 1 && !currentPage)
                ? 'solid'
                : 'outline'
            }
            key={index}
          >
            {page}
          </Button>
        )
      })}
      <IconButton
        disabled={currentPage === pageCount}
        aria-label="Previous page"
        icon={<FaChevronRight />}
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
      />
    </ButtonGroup>
  )
}
