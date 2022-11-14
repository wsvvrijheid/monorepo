import { factories } from '@strapi/strapi'

// TODO: Add search service when https://github.com/strapi/strapi/pull/14208 is merged
export default factories.createCoreService('api::mention.mention')
