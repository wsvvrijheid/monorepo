export async function getStats(userId: number) {
  const activityCreatorCount = await strapi.db
    .query('api::activity.activity')
    .count({
      where: {
        creator: userId,
      },
    })

  const activityApproverCount = await strapi.db
    .query('api::activity.activity')
    .count({
      where: {
        approver: userId,
      },
    })

  const announcementCreatorCount = await strapi.db
    .query('api::announcement.announcement')
    .count({
      where: {
        creator: userId,
      },
    })

  const announcementApproverCount = await strapi.db
    .query('api::announcement.announcement')
    .count({
      where: {
        approver: userId,
      },
    })

  const applicationCreatorCount = await strapi.db
    .query('api::application.application')
    .count({
      where: {
        creator: userId,
      },
    })

  const applicationApproverCount = await strapi.db
    .query('api::application.application')
    .count({
      where: {
        approver: userId,
      },
    })

  const blogCreatorCount = await strapi.db.query('api::blog.blog').count({
    where: {
      creator: userId,
    },
  })

  const blogApproverCount = await strapi.db.query('api::blog.blog').count({
    where: {
      approver: userId,
    },
  })

  const collectionCreatorCount = await strapi.db
    .query('api::collection.collection')
    .count({
      where: {
        creator: userId,
      },
    })

  const collectionApproverCount = await strapi.db
    .query('api::collection.collection')
    .count({
      where: {
        approver: userId,
      },
    })

  const competitionCreatorCount = await strapi.db
    .query('api::competition.competition')
    .count({
      where: {
        creator: userId,
      },
    })

  const competitionApproverCount = await strapi.db
    .query('api::competition.competition')
    .count({
      where: {
        approver: userId,
      },
    })

  const hashtagCreatorCount = await strapi.db
    .query('api::hashtag.hashtag')
    .count({
      where: {
        creator: userId,
      },
    })

  const hashtagApproverCount = await strapi.db
    .query('api::hashtag.hashtag')
    .count({
      where: {
        approver: userId,
      },
    })

  const postCreatorCount = await strapi.db.query('api::post.post').count({
    where: {
      creator: userId,
    },
  })

  const postApproverCount = await strapi.db.query('api::post.post').count({
    where: {
      approver: userId,
    },
  })

  const recommendedTopicCreatorCount = await strapi.db
    .query('api::recommended-topic.recommended-topic')
    .count({
      where: {
        creator: userId,
      },
    })

  const recommendedTweetCreatorCount = await strapi.db
    .query('api::recommended-tweet.recommended-tweet')
    .count({
      where: {
        creator: userId,
      },
    })

  // add more queries as new collections get added with approver/creator fields

  const totalCreatorCount =
    activityCreatorCount +
    announcementCreatorCount +
    applicationCreatorCount +
    blogCreatorCount +
    collectionCreatorCount +
    competitionCreatorCount +
    hashtagCreatorCount +
    postCreatorCount +
    recommendedTopicCreatorCount +
    recommendedTweetCreatorCount

  const totalApproverCount =
    activityApproverCount +
    announcementApproverCount +
    applicationApproverCount +
    blogApproverCount +
    collectionApproverCount +
    competitionApproverCount +
    hashtagApproverCount +
    postApproverCount

  return {
    creatorCount: totalCreatorCount,
    approverCount: totalApproverCount,
  }
}
