import { useEffect, useRef, useState } from 'react'

import { BadgeProps } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { ART_MOCKS, CATEGORY_MOCKS, USER_MOCKS } from '@wsvvrijheid/mocks'
import {
  ApprovalStatus,
  Art,
  Category,
  Role,
  RoleName,
  StrapiModel,
  StrapiModelKeys,
  User,
} from '@wsvvrijheid/types'

import { WTableProps } from './types'
import { WTable } from './WTable'

export default {
  component: WTable,
  title: 'Shared/WTable',
} as Meta<WTableProps<StrapiModel>>

const Template: Story<WTableProps<StrapiModel>> = args => {
  const [sortKey, setSortKey] = useState<[string] | null>(null)
  const [data, setData] = useState<StrapiModel[]>(args.data)
  const initialData = useRef(data)

  useEffect(() => {
    if (!sortKey?.[0]) return setData(initialData.current)

    const [field, sort] = sortKey[0].split(':')

    console.log('sortKey', sortKey)

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[field as keyof StrapiModel] as StrapiModelKeys
      const bValue = b[field as keyof StrapiModel] as StrapiModelKeys

      if (sort === 'asc') {
        return typeof aValue === 'number'
          ? aValue > bValue
            ? 1
            : -1
          : aValue.localeCompare(bValue)
      } else if (sort === 'desc') {
        return typeof aValue === 'number'
          ? aValue < bValue
            ? 1
            : -1
          : bValue.localeCompare(aValue)
      }

      return 0
    })

    setData(sortedData)
  }, [sortKey])

  return (
    <WTable {...args} onSort={value => setSortKey(value || null)} data={data} />
  )
}

export const Arts = Template.bind({})
Arts.args = {
  data: ART_MOCKS.data,
  columns: {
    image: {
      type: 'image',
    },
    title: {}, // default type is text
    approvalStatus: {
      type: 'badge',
      // Custom props based on value
      componentProps: value => {
        const colorScheme = {
          approved: 'primary',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ApprovalStatus],
        }
      },
    },
    publishedAt: {
      type: 'date',
      componentProps: {
        format: 'dd MMMM',
      },
      sortable: true,
    },
  },
} as WTableProps<Art>

export const Users = Template.bind({})
Users.args = {
  data: USER_MOCKS,
  columns: {
    avatar: {
      type: 'image',
    },
    username: {
      sortable: true,
    },
    role: {
      type: 'badge',
      transform: value => (value as Role).name,
      componentProps: value => {
        const colorScheme: { [x in RoleName]?: BadgeProps['colorScheme'] } = {
          Admin: 'blue',
          Authenticated: 'purple',
          'Content Manager': 'green',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as RoleName],
        }
      },
    },
  },
} as WTableProps<User>

export const Categories = Template.bind({})
Categories.args = {
  data: CATEGORY_MOCKS.data,
  columns: {
    name_en: {},
    arts: {
      transform: (value: Art[]) => value.length,
    },
  },
} as WTableProps<Category>
