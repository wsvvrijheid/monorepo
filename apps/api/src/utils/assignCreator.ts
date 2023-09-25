import { Common } from '@strapi/strapi'
import {
  GetNonPopulatableKeys,
  GetValues,
} from '@strapi/strapi/lib/types/core/attributes'

export const assignCreator = async <T extends Common.UID.ContentType>(
  profile: GetValues<
    'api::profile.profile',
    GetNonPopulatableKeys<'api::profile.profile'>
  >,
  id: number,
  uid: T,
) => {
  await strapi.entityService
    .update(uid, id, {
      // TODO: Fix type
      data: { creator: profile?.id } as never,
    })
    .catch(error => {
      console.error('ERROR', error)
    })
}
