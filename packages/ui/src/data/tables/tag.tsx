import { Tag } from '@wsvvrijheid/types'

import { PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useTagColumns =
  (): WTableProps<Tag>['columns'] => {

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
