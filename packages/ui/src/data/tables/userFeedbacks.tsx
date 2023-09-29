import { Icon } from '@chakra-ui/react'
import { FaCheck } from 'react-icons/fa'

import { UserFeedback } from '@wsvvrijheid/types'

import { WTableProps } from '../../components'

export const useUserFeedbacksColumns =
  (): WTableProps<UserFeedback>['columns'] => {
    return {
      comment: {},
      point: {
        cellProps: { textAlign: 'center' },
      },
      issueLink: {
        transform: value => value && <Icon as={FaCheck} />,
        cellProps: { textAlign: 'center' },
      },
      processed: {
        type: 'badge',
        cellProps: { textAlign: 'center' },
        componentProps: value => {
          return {
            variant: 'outline',
            colorScheme: (value as string) ? 'green' : 'yellow',
          }
        },
      },
      createdAt: {
        type: 'date',
        sortable: true,
      },
      site: {},
    }
  }
