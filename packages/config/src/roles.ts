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
    approve: ['contentmanager', 'translator'],
    update: ['contentmanager', 'translator'],
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
    create: ['author', 'contentmanager'],
    approve: ['contentmanager', 'translator'],
    update: ['author', 'contentmanager', 'translator'],
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
    approve: ['academyeditor', 'contentmanager', 'translator'],
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
