import addDays from 'date-fns/addDays'
import formatIso from 'date-fns/formatISO'

export async function getStats(
  userId: number,
  date = new Date(),
  totalDays = 7,
) {
  const start_time = formatIso(addDays(date, -totalDays))
  const end_time = formatIso(date)

  const activityCreatorCount = await strapi.db
    .query('api::activity.activity')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const activityApproverCount = await strapi.db
    .query('api::activity.activity')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const announcementCreatorCount = await strapi.db
    .query('api::announcement.announcement')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const announcementApproverCount = await strapi.db
    .query('api::announcement.announcement')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const applicationCreatorCount = await strapi.db
    .query('api::application.application')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const applicationApproverCount = await strapi.db
    .query('api::application.application')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const blogCreatorCount = await strapi.db.query('api::blog.blog').count({
    where: {
      creator: userId,
      createdAt: {
        $between: [start_time, end_time],
      },
    },
  })

  const blogApproverCount = await strapi.db.query('api::blog.blog').count({
    where: {
      approver: userId,
      createdAt: {
        $between: [start_time, end_time],
      },
    },
  })

  const collectionCreatorCount = await strapi.db
    .query('api::collection.collection')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const collectionApproverCount = await strapi.db
    .query('api::collection.collection')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const competitionCreatorCount = await strapi.db
    .query('api::competition.competition')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const competitionApproverCount = await strapi.db
    .query('api::competition.competition')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const hashtagCreatorCount = await strapi.db
    .query('api::hashtag.hashtag')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const hashtagApproverCount = await strapi.db
    .query('api::hashtag.hashtag')
    .count({
      where: {
        approver: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const postCreatorCount = await strapi.db.query('api::post.post').count({
    where: {
      creator: userId,
      createdAt: {
        $between: [start_time, end_time],
      },
    },
  })

  const postApproverCount = await strapi.db.query('api::post.post').count({
    where: {
      approver: userId,
      createdAt: {
        $between: [start_time, end_time],
      },
    },
  })

  const recommendedTopicCreatorCount = await strapi.db
    .query('api::recommended-topic.recommended-topic')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
      },
    })

  const recommendedTweetCreatorCount = await strapi.db
    .query('api::recommended-tweet.recommended-tweet')
    .count({
      where: {
        creator: userId,
        createdAt: {
          $between: [start_time, end_time],
        },
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
    userId: userId,
    creatorCount: totalCreatorCount,
    approverCount: totalApproverCount,
  }
}
