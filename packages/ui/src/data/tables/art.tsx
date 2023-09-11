import { useRouter } from 'next/router'

import { ApprovalStatus, Art, StrapiLocale, User } from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useArtColumns = (): WTableProps<Art>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    artist: {
      transform: value => (value as User)?.username,
      sortKey: 'username',
      sortable: true,
    },
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
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    createdAt: {
      type: 'date',
      sortable: true,
    },
  }
}
