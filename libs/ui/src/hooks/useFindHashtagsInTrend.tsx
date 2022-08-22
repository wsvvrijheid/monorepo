import { TwitterTrend } from '@wsvvrijheid/types'
import { useAppSelector, useTrends } from '@wsvvrijheid/utils'

export const useFindHashtagInTrends = () => {
  const { defaultHashtags } = useAppSelector(state => state.post)
  const { data: trendsData } = useTrends()

  return defaultHashtags.map(hashtag => {
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
