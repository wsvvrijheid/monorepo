import {
  Hashtag,
  Post,
  StrapiLocale,
  ApprovalStatus,
  User,
  Volunteer,
  Job,
} from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const volunteerColumns = (
  locale: StrapiLocale,
): WTableProps<Volunteer>['columns'] => ({
  name: {},
  availableHours: {},
  phone: {},
  country: {},
  comment: {},
  occupation: {},
  createdAt: {
    type: 'date',
    componentProps: { format: 'dd MMMM' },
    sortable: true,
  },
})
