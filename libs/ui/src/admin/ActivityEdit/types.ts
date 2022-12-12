// import { Dispatch, SetStateAction } from 'react'

import { Activity } from '@wsvvrijheid/types'

export type ActivityEditFormFieldValues = {
  title: string
  description: string
  content: string
  image: File
  creator: number
  date: string
}

export type ActivityEditProps = {
  activity: Activity
}
