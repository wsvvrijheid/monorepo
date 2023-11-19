import { format } from 'date-fns'

import { getStats } from '../../src/libs'

export default async () => {
  const profiles = (await strapi.entityService.findMany(
    'api::profile.profile',
    {
      filters: {
        user: {
          role: {
            type: {
              $notIn: ['public', 'authenticated'],
            },
          },
        },
      },
      fields: ['id'],
    },
  )) as { id: number }[]

  for (const profile of profiles) {
    const stats = await getStats(profile.id as number)
    const date = format(new Date(), 'yyyy-MM-dd')
    const hasApproves = stats.approves.total > 0
    const hasCreates = stats.creates.total > 0

    if (hasApproves || hasCreates) {
      await strapi.entityService.create('api::user-statistic.user-statistic', {
        data: {
          profile: profile.id,
          date,
          publishedAt: new Date(),
          approvedActivity: stats.approves.activity,
          approvedApplication: stats.approves.application,
          approvedBlog: stats.approves.blog,
          approvedCollection: stats.approves.collection,
          approvedCompetition: stats.approves.competition,
          approvedHashtag: stats.approves.hashtag,
          approvedPost: stats.approves.post,
          approvedTotal: stats.approves.total,
          createdActivity: stats.creates.activity,
          createdApplication: stats.creates.application,
          createdBlog: stats.creates.blog,
          createdCollection: stats.creates.collection,
          createdCompetition: stats.creates.competition,
          createdHashtag: stats.creates.hashtag,
          createdPost: stats.creates.post,
          createdTotal: stats.creates.total,
          createdRecommendedTweet: stats.creates.recommendedTweet,
          createdRecommendedTopic: stats.creates.recommendedTopic,
        },
      })
    }
  }
}
