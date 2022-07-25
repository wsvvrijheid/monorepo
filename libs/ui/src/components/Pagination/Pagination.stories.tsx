import { useEffect, useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { Pagination, PaginationProps } from './Pagination'

export default {
  title: 'Forms/Pagination',
  component: Pagination,
  args: {
    currentPage: 3,
    pageCount: 10,
  },
} as Meta<PaginationProps>

const Template: Story<PaginationProps> = args => {
  const [currentPage, setCurrentPage] = useState<number>(args.currentPage)

  useEffect(() => {
    setCurrentPage(args.currentPage)
  }, [args.currentPage])

  return (
    <Pagination
      {...args}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  )
}

export const Default = Template.bind({})
Default.args = {}
