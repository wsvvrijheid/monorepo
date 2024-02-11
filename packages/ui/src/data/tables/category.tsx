import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Category } from '@wsvvrijheid/types'

import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  return {
    id: { sortable: true },
    slug: { sortable: true },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
  }
}
