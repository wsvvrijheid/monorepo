import { Badge, Wrap } from '@chakra-ui/react'
import { useRouter } from 'next/router'

import { Category, Art } from '@wsvvrijheid/types'

import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCategoryColumns = (): WTableProps<Category>['columns'] => {
  const { locale } = useRouter()

  return {
    id: { sortable: true },
    slug: { sortable: true },
    arts: {
      transform: value => (
        <Wrap>
          {(value as Art[])
            .sort((a, b) =>
              a[`title_${locale}`].localeCompare(b[`title_${locale}`]),
            )
            .map(c => (
              <Badge variant={'outline'} key={c.id}>
                {c[`title_${locale}`]}
              </Badge>
            ))}
        </Wrap>
      ),
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
  }
}
