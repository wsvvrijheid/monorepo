import { Common, Attribute } from '@strapi/strapi'

type Profile = Attribute.GetValues<
  'api::profile.profile',
  Attribute.GetKeys<'api::profile.profile'>
>

export const assignCreator = async <T extends Common.UID.ContentType>(
  profile: Profile,
  id: number,
  uid: T,
  field = 'creator',
) => {
  await strapi.entityService
    .update(uid, id, {
      data: { [field]: profile?.id as number } as never,
    })
    .catch(error => {
      console.error(`Assign Creator: ${error.message}`)
    })
}
