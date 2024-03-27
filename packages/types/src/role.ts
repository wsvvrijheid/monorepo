import { StrapiBase } from './strapi'

export type RoleName =
  | 'AcademyEditor'
  | 'AccountManager'
  | 'Admin'
  | 'All'
  | 'ArtEditor Translator'
  | 'ArtEditor'
  | 'Authenticated'
  | 'Author Translator'
  | 'Author'
  | 'ContentManager Translator'
  | 'ContentManager'
  | 'Jury'
  | 'Public'
  | 'Translator'
  | 'Platform Coordinator'

export type RoleType =
  | 'academyeditor'
  | 'accountmanager'
  | 'admin'
  | 'all'
  | 'arteditor'
  | 'arteditor_translator'
  | 'authenticated'
  | 'author'
  | 'author_translator'
  | 'contentmanager'
  | 'contentmanager_translator'
  | 'jury'
  | 'platformcoordinator'
  | 'public'
  | 'translator'

export type Role = Omit<StrapiBase, 'publishedAt'> & {
  description: string
  name: RoleName
  permissions?: Permission
  type: RoleType
  nb_users?: number
}

export type Permission = Omit<StrapiBase, 'publishedAt'> & {
  action: string
  role?: Role
}
