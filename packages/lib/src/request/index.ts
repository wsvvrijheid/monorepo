import { requestCollection } from './collection'
import { requestSingle } from './single'

export * from './types'

export const Request = {
  collection: requestCollection,
  single: requestSingle,
}
