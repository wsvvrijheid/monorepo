import { LangRole, StrapiResponse } from '@wsvvrijheid/types'

export const LANG_ROLE_MOCKS: StrapiResponse<LangRole[]> = {
  data: [
    {
      id: 43,
      role: 'en_tr',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:04:58.576Z',
      publishedAt: '2022-03-10T15:04:58.575Z',
      translators: [],
    },
    {
      id: 44,
      role: 'tr_en',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:06:26.476Z',
      publishedAt: '2022-03-10T15:06:26.475Z',
      translators: [],
    },
    {
      id: 45,
      role: 'tr_nl',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:06:29.543Z',
      publishedAt: '2022-03-10T15:06:29.542Z',
      translators: [],
    },
    {
      id: 46,
      role: 'en_nl',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:06:32.252Z',
      publishedAt: '2022-03-10T15:06:32.250Z',
      translators: [],
    },
    {
      id: 47,
      role: 'nl_en',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:06:36.639Z',
      publishedAt: '2022-03-10T15:06:36.638Z',
      translators: [],
    },
    {
      id: 48,
      role: 'nl_tr',
      createdAt: '2022-03-10T15:04:39.517Z',
      updatedAt: '2022-03-10T15:06:39.623Z',
      publishedAt: '2022-03-10T15:06:39.620Z',
      translators: [],
    },
  ],
  meta: { pagination: { page: 1, pageSize: 25, pageCount: 1, total: 6 } },
}
