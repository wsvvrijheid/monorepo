import addDays from 'date-fns/addDays'
import formatIso from 'date-fns/formatISO'
import { kebabCase } from 'lodash'
import { KebabCase } from 'type-fest'

const models = {
  activity: ['creator', 'approver'],
  announcement: ['creator', 'approver'],
  application: ['creator', 'approver'],
  blog: ['creator', 'approver'],
  collection: ['creator', 'approver'],
  competition: ['creator', 'approver'],
  hashtag: ['creator', 'approver'],
  post: ['creator', 'approver'],
  recommendedTopic: ['creator'],
  recommendedTweet: ['creator'],
}

const modelKeys = Object.keys(models) as Array<keyof typeof models>

type ModelKey = keyof typeof models
type ModelApiKey<T extends ModelKey> = `api::${KebabCase<T>}.${KebabCase<T>}`

const getModelStats = async <T extends ModelKey>(
  type: 'creator' | 'approver',
  modelKey: ModelApiKey<T>,
  userId: number,
  start: string,
  end: string,
) => {
  return await strapi.db.query(modelKey).count({
    where: {
      [type]: userId,
      createdAt: {
        $between: [start, end],
      },
    },
  })
}

export async function getStats(
  userId: number,
  date = new Date(),
  totalDays = 7,
) {
  const start = formatIso(addDays(date, -totalDays))
  const end = formatIso(date)

  const statsTypes = ['creator', 'approver'] as ['creator', 'approver']

  const stats = {} as Record<
    (typeof statsTypes)[number],
    Record<ModelKey | 'total', number>
  >

  for (const type of statsTypes) {
    for (const modelKey of modelKeys) {
      if (!models[modelKey].includes(type)) continue

      const apiPath = kebabCase(modelKey) as KebabCase<ModelKey>

      const count = await getModelStats(
        type,
        `api::${apiPath}.${apiPath}`,
        userId,
        start,
        end,
      )

      stats[type] = {
        ...stats[type],
        [modelKey]: count,
        total: (stats[type]?.total ?? 0) + count,
      }
    }
  }

  return {
    approves: stats.approver,
    creations: stats.creator,
  }
}
