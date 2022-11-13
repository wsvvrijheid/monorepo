import syncTopics from '../../../libs/topics';

const { createCoreService } = require('@strapi/strapi').factories;

export default createCoreService('api::topic.topic', ({ strapi }) => ({
  async sync(...args: any[]) {
    let response = await syncTopics({ strapi });

    return response;
  },
}));
