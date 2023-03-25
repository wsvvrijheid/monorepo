import { Feedback, StrapiCollectionResponse } from '@wsvvrijheid/types'

export const FEEDBACK_MOCK: StrapiCollectionResponse<Feedback[]> = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 1 } },
}
