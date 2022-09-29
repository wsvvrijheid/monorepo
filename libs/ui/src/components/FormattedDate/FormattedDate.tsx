import { FC } from 'react'

import { chakra } from '@chakra-ui/react'

import { useLocaleTimeFormat } from '../../hooks'
import { FormattedDateProps } from './types'

const FormattedDate: FC<FormattedDateProps> = ({
  date,
  format = 'dd MMMM yyyy',
  ...rest
}) => {
  const { formattedDate } = useLocaleTimeFormat(date, format)

  if (!formattedDate) {
    return null
  }

  return <chakra.time {...rest}>{formattedDate}</chakra.time>
}

export default FormattedDate
