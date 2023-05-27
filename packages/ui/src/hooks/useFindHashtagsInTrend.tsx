import { useTrends } from '@wsvvrijheid/services'
import { TwitterTrend } from '@wsvvrijheid/types'

import { useHashtagContext } from '../post-maker'

export const useFindHashtagInTrends = () => {
  const { data } = useHashtagContext()
  const { data: trendsData } = useTrends()

  return [data?.hashtagDefault, data?.hashtagExtra]
    .filter(Boolean)
    .map(hashtag => {
      const { nl, tr, en } = trendsData ?? {}

      if (!hashtag || !nl || !tr || !en) return null

      const indexEn = en?.findIndex(
        (trend: TwitterTrend) => trend.name === hashtag,
      )
      const indexNl = nl?.findIndex(
        (trend: TwitterTrend) => trend.name === hashtag,
      )
      const indexTr = tr?.findIndex(
        (trend: TwitterTrend) => trend.name === hashtag,
      )

      if (!indexEn || !indexNl || !indexTr) return null

      return {
        nl: { ...nl[indexNl], indexNl },
        tr: { ...tr[indexTr], indexTr },
        en: { ...en[indexEn], indexEn },
      }
    })
}
