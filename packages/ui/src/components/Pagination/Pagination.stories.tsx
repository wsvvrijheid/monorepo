import { useEffect, useState } from 'react'

import { Story, Meta } from '@storybook/react'

import { Pagination } from './Pagination'
import { PaginationProps } from './types'

export default {
  title: 'Forms/Pagination',
  component: Pagination,
  args: {
    currentPage: 3,
    totalCount: 10,
    siblingCount: 2,
  },
  argTypes: {
    size: { control: 'radio', options: ['sm', 'md', 'lg'] },
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

export const NotAttached = Template.bind({})
NotAttached.args = {
  isAttached: false,
}

export const Variant = Template.bind({})
Variant.args = {
  variant: 'ghost',
}

export const Size = Template.bind({})
Size.args = {
  size: 'sm',
}
