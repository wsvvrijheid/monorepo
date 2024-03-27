import { PartialStrapiEndpointMap, RoleType } from '@fc/types'

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
    create: ['contentmanager', 'platformcoordinator'],
    approve: ['contentmanager', 'translator', 'platformcoordinator'],
    update: ['contentmanager', 'translator', 'platformcoordinator'],
    delete: [],
    publish: ['contentmanager', 'platformcoordinator'],
  },
  'archive-contents': {
    create: ['contentmanager', 'translator', 'platformcoordinator'],
    approve: ['contentmanager', 'translator', 'platformcoordinator'],
    update: ['contentmanager', 'translator', 'platformcoordinator'],
    delete: [],
    publish: ['contentmanager', 'translator', 'platformcoordinator'],
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
  categories: {
    create: ['contentmanager', 'platformcoordinator'],
    approve: ['contentmanager', 'translator', 'platformcoordinator'],
    update: ['contentmanager', 'translator', 'platformcoordinator'],
    delete: [],
    publish: ['contentmanager', 'platformcoordinator'],
  },
  collections: {
    create: ['arteditor'],
    approve: ['arteditor'],
    update: ['arteditor'],
    delete: [],
    publish: ['arteditor'],
  },
  courses: {
    create: ['academyeditor', 'platformcoordinator'],
    approve: [
      'academyeditor',
      'contentmanager',
      'translator',
      'platformcoordinator',
    ],
    update: ['academyeditor', 'platformcoordinator'],
    delete: [],
    publish: ['academyeditor', 'platformcoordinator'],
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
  profiles: {
    create: ['platformcoordinator'],
    approve: ['platformcoordinator'],
    update: ['platformcoordinator'],
    delete: [],
    publish: ['platformcoordinator'],
  },
  tags: {
    create: ['contentmanager'],
    approve: ['contentmanager', 'translator'],
    update: ['contentmanager', 'translator'],
    delete: [],
    publish: ['contentmanager'],
  },
}
