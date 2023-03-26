import { Comment, StrapiCollectionResponse } from '@wsvvrijheid/types'

export const COMMENT_MOCKS: StrapiCollectionResponse<Comment[]> = {
  data: [],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 2, total: 39 } },
}
