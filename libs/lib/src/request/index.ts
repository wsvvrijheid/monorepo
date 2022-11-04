import { requestCollection } from './collection'
import { requestMentions } from './mention'
import { requestSingle } from './single'

export const Request = {
  collection: requestCollection,
  mention: requestMentions,
  single: requestSingle,
}
