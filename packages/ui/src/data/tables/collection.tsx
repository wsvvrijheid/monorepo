import { useRouter } from 'next/router'

import {
  Collection,
  StrapiLocale,
  Art,
  ApprovalStatus,
} from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCollectionColumns = (): WTableProps<Collection>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: { sortable: true },
    slug: { label: 'Slug' },
    [`description_${locale}`]: {},
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
    arts: { transform: value => (value as Art[])?.length },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      label: 'Published',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    createdAt: {
      type: 'date',
      componentProps: { format: 'dd MMMM' },
      sortable: true,
    },
  }
}
