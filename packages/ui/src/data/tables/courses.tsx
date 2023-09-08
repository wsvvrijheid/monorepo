import { useRouter } from 'next/router'

import { StrapiLocale, Course } from '@wsvvrijheid/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      label: 'Published',
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    startDate: {
      type: 'date',
      componentProps: { format: 'dd MMMM' },
      sortable: true,
    },
    endDate: {
      type: 'date',
      componentProps: { format: 'dd MMMM' },
      sortable: true,
    },
  }
}
