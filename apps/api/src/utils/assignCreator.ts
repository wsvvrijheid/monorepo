import { Common } from '@strapi/strapi'
import { ApiProfileProfile } from '../../types/generated/contentTypes'

export const assignCreator = async <T extends Common.UID.ContentType>(
  profile: ApiProfileProfile['attributes'],
  id: number,
  uid: T,
) => {
  await strapi.entityService
    .update(uid, id, {
      data: { creator: profile?.id as number } as never,
    })
    .catch(error => {
      console.error('ERROR', error)
    })
}
