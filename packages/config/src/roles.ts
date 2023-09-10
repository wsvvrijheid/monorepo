import { PartialStrapiEndpointMap, RoleType } from '@wsvvrijheid/types'

export type RoleActionType =
  | 'create'
  | 'approve'
  | 'update'
  | 'delete'
  | 'publish'

export const actionRolesEndpoints: PartialStrapiEndpointMap<
  Record<RoleActionType, RoleType[]>
> = {
  activities: {
    create: ['contentmanager'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
  announcements: {
    create: ['contentmanager'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
  arts: {
    create: ['all'],
    approve: ['arteditor'],
    update: ['arteditor'],
    delete: ['arteditor'],
    publish: ['arteditor'],
  },
  blogs: {
    create: ['author'],
    approve: [],
    update: ['author'],
    delete: ['author'],
    publish: [],
  },
  collections: {
    create: ['arteditor'],
    approve: ['arteditor'],
    update: ['arteditor'],
    delete: [],
    publish: ['arteditor'],
  },
  courses: {
    create: ['academyeditor'],
    approve: ['academyeditor'],
    update: ['academyeditor'],
    delete: [],
    publish: ['academyeditor'],
  },
  hashtags: {
    create: ['contentmanager'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
  posts: {
    create: ['all'],
    approve: ['contentmanager'],
    update: ['contentmanager'],
    delete: [],
    publish: ['contentmanager'],
  },
}
