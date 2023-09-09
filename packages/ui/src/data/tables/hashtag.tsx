import {
  ApprovalStatus,
  Hashtag,
  Mention,
  Post,
  StrapiLocale,
} from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useHashtagColumns = (): WTableProps<Hashtag>['columns'] => {
  return {
    image: { type: 'image' },
    title: { sortable: true },
    approvalStatus: {
      type: 'badge',
      componentProps: value => {
        const colorScheme = {
          approved: 'green',
          pending: 'yellow',
          rejected: 'red',
        }

        return {
          variant: 'outline',
          colorScheme: colorScheme[value as ApprovalStatus],
        }
      },
    },
    createdAt: {
      type: 'date',
      componentProps: { format: 'dd MMMM' },
      sortable: true,
    },
    posts: {
      transform: value => (value as Post[])?.length,
    },
    mentions: {
      transform: value => (value as Mention[])?.length,
    },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
  }
}
