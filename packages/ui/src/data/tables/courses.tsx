import { useRouter } from 'next/router'

import { Course, StrapiLocale } from '@fc/types'

import { LocaleBadges, PublicationBadges } from '../../admin'
import { WTableProps } from '../../components'
import {
  MailChimp,
  MailChimpProps,
} from '../../components/CourseDetailPage/MailChimp'

export const useCourseColumns = (): WTableProps<Course>['columns'] => {
  const { locale } = useRouter()

  return {
    image: { type: 'image' },
    [`title_${locale}`]: {},
    [`description_${locale}`]: {},
    mailchimp: {
      transform: value => <MailChimp {...(value as MailChimpProps)} />,
    },
    translates: {
      transform: value => <LocaleBadges locales={value as StrapiLocale[]} />,
    },
    publishedAt: {
      transform: value => (
        <PublicationBadges publishedAt={value as string | null} />
      ),
    },
    startDate: {
      type: 'date',
      sortable: true,
    },
    endDate: {
      type: 'date',
      sortable: true,
    },
  }
}
