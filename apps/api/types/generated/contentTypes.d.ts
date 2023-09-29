/* eslint-disable @typescript-eslint/ban-types */
import type { Schema, Attribute } from '@strapi/strapi'

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions'
  info: {
    name: 'Permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    properties: Attribute.JSON & Attribute.DefaultTo<{}>
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users'
  info: {
    name: 'User'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    username: Attribute.String
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    registrationToken: Attribute.String & Attribute.Private
    isActive: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>
    preferedLanguage: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles'
  info: {
    name: 'Role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens'
  info: {
    name: 'Api Token'
    singularName: 'api-token'
    pluralName: 'api-tokens'
    displayName: 'Api Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions'
  info: {
    name: 'API Token Permission'
    description: ''
    singularName: 'api-token-permission'
    pluralName: 'api-token-permissions'
    displayName: 'API Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens'
  info: {
    name: 'Transfer Token'
    singularName: 'transfer-token'
    pluralName: 'transfer-tokens'
    displayName: 'Transfer Token'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }> &
      Attribute.DefaultTo<''>
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    lastUsedAt: Attribute.DateTime
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >
    expiresAt: Attribute.DateTime
    lifespan: Attribute.BigInteger
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions'
  info: {
    name: 'Transfer Token Permission'
    description: ''
    singularName: 'transfer-token-permission'
    pluralName: 'transfer-token-permissions'
    displayName: 'Transfer Token Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1
      }>
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files'
  info: {
    singularName: 'file'
    pluralName: 'files'
    displayName: 'File'
    description: ''
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    alternativeText: Attribute.String
    caption: Attribute.String
    width: Attribute.Integer
    height: Attribute.Integer
    formats: Attribute.JSON
    hash: Attribute.String & Attribute.Required
    ext: Attribute.String
    mime: Attribute.String & Attribute.Required
    size: Attribute.Decimal & Attribute.Required
    url: Attribute.String & Attribute.Required
    previewUrl: Attribute.String
    provider: Attribute.String & Attribute.Required
    provider_metadata: Attribute.JSON
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<{
        min: 1
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders'
  info: {
    singularName: 'folder'
    pluralName: 'folders'
    displayName: 'Folder'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }>
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale'
  info: {
    singularName: 'locale'
    pluralName: 'locales'
    collectionName: 'locales'
    displayName: 'Locale'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<{
        min: 1
        max: 50
      }>
    code: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions'
  info: {
    name: 'permission'
    description: ''
    singularName: 'permission'
    pluralName: 'permissions'
    displayName: 'Permission'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    action: Attribute.String & Attribute.Required
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles'
  info: {
    name: 'role'
    description: ''
    singularName: 'role'
    pluralName: 'roles'
    displayName: 'Role'
  }
  pluginOptions: {
    'content-manager': {
      visible: false
    }
    'content-type-builder': {
      visible: false
    }
  }
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    description: Attribute.String
    type: Attribute.String & Attribute.Unique
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users'
  info: {
    name: 'user'
    description: ''
    singularName: 'user'
    pluralName: 'users'
    displayName: 'User'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3
      }>
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    provider: Attribute.String
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6
      }>
    resetPasswordToken: Attribute.String & Attribute.Private
    confirmationToken: Attribute.String & Attribute.Private
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiAccountStatisticAccountStatistic
  extends Schema.CollectionType {
  collectionName: 'account_statistics'
  info: {
    singularName: 'account-statistic'
    pluralName: 'account-statistics'
    displayName: 'Account Statistic'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    username: Attribute.String
    followers: Attribute.Integer
    tweets: Attribute.Integer
    retweets: Attribute.Integer
    likes: Attribute.Integer
    followings: Attribute.Integer
    replies: Attribute.Integer
    date: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::account-statistic.account-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiActivityActivity extends Schema.CollectionType {
  collectionName: 'activities'
  info: {
    singularName: 'activity'
    pluralName: 'activities'
    displayName: 'Activity'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::activity.activity', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    tags: Attribute.Relation<
      'api::activity.activity',
      'manyToMany',
      'api::tag.tag'
    >
    categories: Attribute.Relation<
      'api::activity.activity',
      'manyToMany',
      'api::category.category'
    >
    approver: Attribute.Relation<
      'api::activity.activity',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::activity.activity',
      'manyToOne',
      'api::profile.profile'
    >
    platforms: Attribute.Relation<
      'api::activity.activity',
      'manyToMany',
      'api::platform.platform'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::activity.activity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::activity.activity',
      'oneToMany',
      'api::activity.activity'
    >
    locale: Attribute.String
  }
}

export interface ApiApplicantApplicant extends Schema.CollectionType {
  collectionName: 'applicants'
  info: {
    singularName: 'applicant'
    pluralName: 'applicants'
    displayName: 'Applicant'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    applications: Attribute.Relation<
      'api::applicant.applicant',
      'oneToMany',
      'api::application.application'
    >
    profile: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::applicant.applicant',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiApplicationApplication extends Schema.CollectionType {
  collectionName: 'applications'
  info: {
    singularName: 'application'
    pluralName: 'applications'
    displayName: 'Application'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::application.application', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    competition: Attribute.Relation<
      'api::application.application',
      'manyToOne',
      'api::competition.competition'
    >
    applicant: Attribute.Relation<
      'api::application.application',
      'manyToOne',
      'api::applicant.applicant'
    >
    votes: Attribute.Relation<
      'api::application.application',
      'oneToMany',
      'api::vote.vote'
    >
    tags: Attribute.Relation<
      'api::application.application',
      'manyToMany',
      'api::tag.tag'
    >
    feedbacks: Attribute.Relation<
      'api::application.application',
      'oneToMany',
      'api::feedback.feedback'
    >
    approver: Attribute.Relation<
      'api::application.application',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::application.application',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::application.application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::application.application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::application.application',
      'oneToMany',
      'api::application.application'
    >
    locale: Attribute.String
  }
}

export interface ApiArtArt extends Schema.CollectionType {
  collectionName: 'arts'
  info: {
    singularName: 'art'
    pluralName: 'arts'
    displayName: 'Art'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title_tr: Attribute.String
    title_en: Attribute.String
    title_nl: Attribute.String
    slug: Attribute.UID<'api::art.art', 'title_nl'> & Attribute.Required
    description_tr: Attribute.Text & Attribute.DefaultTo<'Description'>
    description_en: Attribute.Text
    description_nl: Attribute.Text
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likes: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<{
        min: 0
      }> &
      Attribute.DefaultTo<0>
    views: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<{
        min: 0
      }> &
      Attribute.DefaultTo<0>
    categories: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::category.category'
    >
    tags: Attribute.Relation<'api::art.art', 'oneToMany', 'api::tag.tag'>
    feedbacks: Attribute.Relation<
      'api::art.art',
      'oneToMany',
      'api::feedback.feedback'
    >
    collection: Attribute.Relation<
      'api::art.art',
      'manyToOne',
      'api::collection.collection'
    >
    comments: Attribute.Relation<
      'api::art.art',
      'oneToMany',
      'api::comment.comment'
    >
    likers: Attribute.Relation<
      'api::art.art',
      'manyToMany',
      'api::profile.profile'
    >
    votes: Attribute.Relation<'api::art.art', 'oneToMany', 'api::vote.vote'>
    artist: Attribute.Relation<
      'api::art.art',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::art.art', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs'
  info: {
    singularName: 'blog'
    pluralName: 'blogs'
    displayName: 'Blog'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::blog.blog', 'title'> & Attribute.Required
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    likes: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<{
        min: 0
      }> &
      Attribute.DefaultTo<0>
    views: Attribute.Integer &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }> &
      Attribute.SetMinMax<{
        min: 0
      }> &
      Attribute.DefaultTo<0>
    categories: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::category.category'
    >
    tags: Attribute.Relation<'api::blog.blog', 'manyToMany', 'api::tag.tag'>
    comments: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::comment.comment'
    >
    likers: Attribute.Relation<
      'api::blog.blog',
      'manyToMany',
      'api::profile.profile'
    >
    author: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::profile.profile'
    >
    approver: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::blog.blog',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::blog.blog',
      'oneToMany',
      'api::blog.blog'
    >
    locale: Attribute.String
  }
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories'
  info: {
    singularName: 'category'
    pluralName: 'categories'
    displayName: 'Category'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    slug: Attribute.UID<'api::category.category', 'name_en'> &
      Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    blogs: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::blog.blog'
    >
    mentions: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::mention.mention'
    >
    competitions: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::competition.competition'
    >
    activities: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::activity.activity'
    >
    arts: Attribute.Relation<
      'api::category.category',
      'manyToMany',
      'api::art.art'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCollectionCollection extends Schema.CollectionType {
  collectionName: 'collections'
  info: {
    singularName: 'collection'
    pluralName: 'collections'
    displayName: 'Collection'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::collection.collection', 'title'> &
      Attribute.Required
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    date: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    arts: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::art.art'
    >
    approver: Attribute.Relation<
      'api::collection.collection',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::collection.collection',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::collection.collection',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::collection.collection',
      'oneToMany',
      'api::collection.collection'
    >
    locale: Attribute.String
  }
}

export interface ApiCommentComment extends Schema.CollectionType {
  collectionName: 'comments'
  info: {
    singularName: 'comment'
    pluralName: 'comments'
    displayName: 'Comment'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    content: Attribute.Text & Attribute.Required
    name: Attribute.String
    email: Attribute.Email
    profile: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::profile.profile'
    >
    blog: Attribute.Relation<
      'api::comment.comment',
      'manyToOne',
      'api::blog.blog'
    >
    art: Attribute.Relation<'api::comment.comment', 'manyToOne', 'api::art.art'>
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::comment.comment',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCompetitionCompetition extends Schema.CollectionType {
  collectionName: 'competitions'
  info: {
    singularName: 'competition'
    pluralName: 'competitions'
    displayName: 'Competition'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::competition.competition', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    deadline: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    applications: Attribute.Relation<
      'api::competition.competition',
      'oneToMany',
      'api::application.application'
    >
    categories: Attribute.Relation<
      'api::competition.competition',
      'manyToMany',
      'api::category.category'
    >
    approver: Attribute.Relation<
      'api::competition.competition',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::competition.competition',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::competition.competition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::competition.competition',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::competition.competition',
      'oneToMany',
      'api::competition.competition'
    >
    locale: Attribute.String
  }
}

export interface ApiCourseCourse extends Schema.CollectionType {
  collectionName: 'courses'
  info: {
    singularName: 'course'
    pluralName: 'courses'
    displayName: 'Course'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    title_en: Attribute.String
    title_tr: Attribute.String
    title_nl: Attribute.String
    slug: Attribute.UID<'api::course.course', 'title_en'>
    description_en: Attribute.Text
    description_tr: Attribute.Text
    description_nl: Attribute.Text
    content_en: Attribute.RichText
    content_tr: Attribute.RichText
    content_nl: Attribute.RichText
    location: Attribute.String
    language: Attribute.Enumeration<['en', 'tr', 'nl']>
    instructor: Attribute.String
    price: Attribute.Integer
    quota: Attribute.Integer
    isOnline: Attribute.Boolean
    image: Attribute.Media
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']>
    startDate: Attribute.Date
    endDate: Attribute.Date
    tags: Attribute.Relation<'api::course.course', 'manyToMany', 'api::tag.tag'>
    applications: Attribute.Relation<
      'api::course.course',
      'oneToMany',
      'api::course-application.course-application'
    >
    platform: Attribute.Relation<
      'api::course.course',
      'manyToOne',
      'api::platform.platform'
    >
    faqs: Attribute.Component<'faq.faq', true>
    curriculum: Attribute.Component<'course.curriculum', true>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiCourseApplicationCourseApplication
  extends Schema.CollectionType {
  collectionName: 'course_applications'
  info: {
    singularName: 'course-application'
    pluralName: 'course-applications'
    displayName: 'CourseApplication'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String
    email: Attribute.Email
    city: Attribute.String
    country: Attribute.String
    phone: Attribute.String
    message: Attribute.Text
    hasPaid: Attribute.Boolean
    approvalStatus: Attribute.Enumeration<['approved', 'pending', 'rejected']> &
      Attribute.DefaultTo<'pending'>
    course: Attribute.Relation<
      'api::course-application.course-application',
      'manyToOne',
      'api::course.course'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::course-application.course-application',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiDonateDonate extends Schema.CollectionType {
  collectionName: 'donates'
  info: {
    singularName: 'donate'
    pluralName: 'donates'
    displayName: 'Donate'
    description: ''
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    status: Attribute.String
    amount: Attribute.Decimal
    email: Attribute.Email
    name: Attribute.String
    phone: Attribute.String
    adddress: Attribute.Text
    checkoutSessionId: Attribute.String & Attribute.Unique
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::donate.donate',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks'
  info: {
    singularName: 'feedback'
    pluralName: 'feedbacks'
    displayName: 'Feedback'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    message: Attribute.Text & Attribute.Required
    point: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
        max: 10
      }>
    status: Attribute.Enumeration<['approved', 'rejected']> & Attribute.Required
    art: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::art.art'
    >
    application: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::application.application'
    >
    editor: Attribute.Relation<
      'api::feedback.feedback',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiHashtagHashtag extends Schema.CollectionType {
  collectionName: 'hashtags'
  info: {
    singularName: 'hashtag'
    pluralName: 'hashtags'
    displayName: 'Hashtag'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::hashtag.hashtag', 'title'> &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Content'>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    image: Attribute.Media &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    hashtagDefault: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    hashtagExtra: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    date: Attribute.DateTime &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    categories: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::category.category'
    >
    mentions: Attribute.Relation<
      'api::hashtag.hashtag',
      'manyToMany',
      'api::mention.mention'
    >
    posts: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::post.post'
    >
    approver: Attribute.Relation<
      'api::hashtag.hashtag',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::hashtag.hashtag',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::hashtag.hashtag',
      'oneToMany',
      'api::hashtag.hashtag'
    >
    locale: Attribute.String
  }
}

export interface ApiJobJob extends Schema.CollectionType {
  collectionName: 'jobs'
  info: {
    singularName: 'job'
    pluralName: 'jobs'
    displayName: 'Job'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    slug: Attribute.UID<'api::job.job', 'name_en'> & Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    platform: Attribute.Relation<
      'api::job.job',
      'manyToOne',
      'api::platform.platform'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::job.job', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiLangRoleLangRole extends Schema.CollectionType {
  collectionName: 'lang_roles'
  info: {
    singularName: 'lang-role'
    pluralName: 'lang-roles'
    displayName: 'Lang Role'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    role: Attribute.Enumeration<
      ['en_tr', 'en_nl', 'tr_en', 'tr_nl', 'nl_en', 'nl_tr']
    > &
      Attribute.Required
    translator: Attribute.Relation<
      'api::lang-role.lang-role',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::lang-role.lang-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::lang-role.lang-role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiMentionMention extends Schema.CollectionType {
  collectionName: 'mentions'
  info: {
    singularName: 'mention'
    pluralName: 'mentions'
    displayName: 'Mention'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    username: Attribute.UID & Attribute.Required
    data: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    categories: Attribute.Relation<
      'api::mention.mention',
      'manyToMany',
      'api::category.category'
    >
    hashtags: Attribute.Relation<
      'api::mention.mention',
      'manyToMany',
      'api::hashtag.hashtag'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::mention.mention',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::mention.mention',
      'oneToMany',
      'api::mention.mention'
    >
    locale: Attribute.String
  }
}

export interface ApiPlatformPlatform extends Schema.CollectionType {
  collectionName: 'platforms'
  info: {
    singularName: 'platform'
    pluralName: 'platforms'
    displayName: 'Platform'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    slug: Attribute.UID<'api::platform.platform', 'name_en'> &
      Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    description_en: Attribute.Text
    description_nl: Attribute.Text
    description_tr: Attribute.Text
    content_en: Attribute.RichText
    content_nl: Attribute.RichText
    content_tr: Attribute.RichText
    image: Attribute.Media
    link: Attribute.String
    jobs: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::job.job'
    >
    courses: Attribute.Relation<
      'api::platform.platform',
      'oneToMany',
      'api::course.course'
    >
    activities: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::activity.activity'
    >
    volunteers: Attribute.Relation<
      'api::platform.platform',
      'manyToMany',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::platform.platform',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiPostPost extends Schema.CollectionType {
  collectionName: 'posts'
  info: {
    singularName: 'post'
    pluralName: 'posts'
    displayName: 'Post'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    description: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    content: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    reference: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    approvalStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    capsStatus: Attribute.Enumeration<['pending', 'approved', 'rejected']> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'pending'>
    imageParams: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    twitterMedia: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    hashtag: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::hashtag.hashtag'
    >
    tags: Attribute.Relation<'api::post.post', 'manyToMany', 'api::tag.tag'>
    approver: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::profile.profile'
    >
    creator: Attribute.Relation<
      'api::post.post',
      'manyToOne',
      'api::profile.profile'
    >
    video: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    caps: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    videoUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::post.post', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::post.post',
      'oneToMany',
      'api::post.post'
    >
    locale: Attribute.String
  }
}

export interface ApiPrivacyPrivacy extends Schema.SingleType {
  collectionName: 'privacies'
  info: {
    singularName: 'privacy'
    pluralName: 'privacies'
    displayName: 'Privacy'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::privacy.privacy', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::privacy.privacy',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::privacy.privacy',
      'oneToMany',
      'api::privacy.privacy'
    >
    locale: Attribute.String
  }
}

export interface ApiProfileProfile extends Schema.CollectionType {
  collectionName: 'profiles'
  info: {
    singularName: 'profile'
    pluralName: 'profiles'
    displayName: 'Profile'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    name: Attribute.String & Attribute.Required
    email: Attribute.Email & Attribute.Required & Attribute.Unique
    bio: Attribute.Text
    occupation: Attribute.String
    phone: Attribute.String
    country: Attribute.Enumeration<
      [
        'AF',
        'AX',
        'AL',
        'DZ',
        'AS',
        'AD',
        'AO',
        'AI',
        'AQ',
        'AG',
        'AR',
        'AM',
        'AW',
        'AU',
        'AT',
        'AZ',
        'BS',
        'BH',
        'BD',
        'BB',
        'BY',
        'BE',
        'BZ',
        'BJ',
        'BM',
        'BT',
        'BO',
        'BA',
        'BW',
        'BV',
        'BR',
        'IO',
        'BN',
        'BG',
        'BF',
        'BI',
        'KH',
        'CM',
        'CA',
        'CV',
        'KY',
        'CF',
        'TD',
        'CL',
        'CN',
        'CX',
        'CC',
        'CO',
        'KM',
        'CG',
        'CD',
        'CK',
        'CR',
        'CI',
        'HR',
        'CU',
        'CY',
        'CZ',
        'DK',
        'DJ',
        'DM',
        'DO',
        'EC',
        'EG',
        'SV',
        'GQ',
        'ER',
        'EE',
        'ET',
        'FK',
        'FO',
        'FJ',
        'FI',
        'FR',
        'GF',
        'PF',
        'TF',
        'GA',
        'GM',
        'GE',
        'DE',
        'GH',
        'GI',
        'GR',
        'GL',
        'GD',
        'GP',
        'GU',
        'GT',
        'GG',
        'GN',
        'GW',
        'GY',
        'HT',
        'HM',
        'VA',
        'HN',
        'HK',
        'HU',
        'IS',
        'IN',
        'ID',
        'IR',
        'IQ',
        'IE',
        'IM',
        'IL',
        'IT',
        'JM',
        'JP',
        'JE',
        'JO',
        'KZ',
        'KE',
        'KI',
        'KP',
        'KR',
        'KW',
        'KG',
        'LA',
        'LV',
        'LB',
        'LS',
        'LR',
        'LY',
        'LI',
        'LT',
        'LU',
        'MO',
        'MK',
        'MG',
        'MW',
        'MY',
        'MV',
        'ML',
        'MT',
        'MH',
        'MQ',
        'MR',
        'MU',
        'YT',
        'MX',
        'FM',
        'MD',
        'MC',
        'MN',
        'ME',
        'MS',
        'MA',
        'MZ',
        'MM',
        'NA',
        'NR',
        'NP',
        'NL',
        'AN',
        'NC',
        'NZ',
        'NI',
        'NE',
        'NG',
        'NU',
        'NF',
        'MP',
        'NO',
        'OM',
        'PK',
        'PW',
        'PS',
        'PA',
        'PG',
        'PY',
        'PE',
        'PH',
        'PN',
        'PL',
        'PT',
        'PR',
        'QA',
        'RE',
        'RO',
        'RU',
        'RW',
        'SH',
        'KN',
        'LC',
        'PM',
        'VC',
        'WS',
        'SM',
        'ST',
        'SA',
        'SN',
        'RS',
        'SC',
        'SL',
        'SG',
        'SK',
        'SI',
        'SB',
        'SO',
        'ZA',
        'GS',
        'ES',
        'LK',
        'SD',
        'SR',
        'SJ',
        'SZ',
        'SE',
        'CH',
        'SY',
        'TW',
        'TJ',
        'TZ',
        'TH',
        'TL',
        'TG',
        'TK',
        'TO',
        'TT',
        'TN',
        'TR',
        'TM',
        'TC',
        'TV',
        'UG',
        'UA',
        'AE',
        'GB',
        'US',
        'UM',
        'UY',
        'UZ',
        'VU',
        'VE',
        'VN',
        'VG',
        'VI',
        'WF',
        'EH',
        'YE',
        'ZM',
        'ZW',
      ]
    > &
      Attribute.DefaultTo<'NL'>
    availableHours: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
      }> &
      Attribute.DefaultTo<0>
    heardFrom: Attribute.String
    comment: Attribute.Text
    linkedin: Attribute.String
    twitter: Attribute.String
    instagram: Attribute.String
    facebook: Attribute.String
    inMailingList: Attribute.Boolean & Attribute.DefaultTo<false>
    approved: Attribute.Boolean & Attribute.DefaultTo<false>
    isPublic: Attribute.Boolean & Attribute.DefaultTo<false>
    jobs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::job.job'
    >
    age: Attribute.Integer
    city: Attribute.String
    platforms: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::platform.platform'
    >
    avatar: Attribute.Media
    isVolunteer: Attribute.Boolean
    approvedActivities: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::activity.activity'
    >
    createdActivities: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::activity.activity'
    >
    applicant: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'api::applicant.applicant'
    >
    approvedApplications: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::application.application'
    >
    createdApplications: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::application.application'
    >
    likedArts: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::art.art'
    >
    ownedArts: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::art.art'
    >
    likedBlogs: Attribute.Relation<
      'api::profile.profile',
      'manyToMany',
      'api::blog.blog'
    >
    ownedBlogs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::blog.blog'
    >
    createdBlogs: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::blog.blog'
    >
    approvedCollections: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::collection.collection'
    >
    createdCollections: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::collection.collection'
    >
    comments: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::comment.comment'
    >
    approvedCompetitions: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::competition.competition'
    >
    createdCompetitions: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::competition.competition'
    >
    feedbacks: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::feedback.feedback'
    >
    approvedHashtags: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::hashtag.hashtag'
    >
    createdHashtags: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::hashtag.hashtag'
    >
    langRoles: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::lang-role.lang-role'
    >
    approvedPosts: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::post.post'
    >
    createdPosts: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::post.post'
    >
    createdTopics: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::recommended-topic.recommended-topic'
    >
    createdTweets: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::recommended-tweet.recommended-tweet'
    >
    stats: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::user-statistic.user-statistic'
    >
    votes: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::vote.vote'
    >
    juryVotes: Attribute.Relation<
      'api::profile.profile',
      'oneToMany',
      'api::vote.vote'
    >
    user: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'plugin::users-permissions.user'
    >
    role: Attribute.Relation<
      'api::profile.profile',
      'manyToOne',
      'plugin::users-permissions.role'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::profile.profile',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiRecommendedTopicRecommendedTopic
  extends Schema.CollectionType {
  collectionName: 'recommended_topics'
  info: {
    singularName: 'recommended-topic'
    pluralName: 'recommended-topics'
    displayName: 'Recommended Topic'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    description: Attribute.Text &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<'Description'>
    image: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    url: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    category: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    publisher: Attribute.String &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    time: Attribute.DateTime &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    skipped: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    posted: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    creator: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::recommended-topic.recommended-topic',
      'oneToMany',
      'api::recommended-topic.recommended-topic'
    >
    locale: Attribute.String
  }
}

export interface ApiRecommendedTweetRecommendedTweet
  extends Schema.CollectionType {
  collectionName: 'recommended_tweets'
  info: {
    singularName: 'recommended-tweet'
    pluralName: 'recommended-tweets'
    displayName: 'Recommended Tweet'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    text: Attribute.Text &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    isShared: Attribute.Boolean &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }> &
      Attribute.DefaultTo<false>
    originalTweet: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    mentions: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::mention.mention'
    >
    video: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    creator: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'manyToOne',
      'api::profile.profile'
    >
    videoUrl: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    caps: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::recommended-tweet.recommended-tweet',
      'oneToMany',
      'api::recommended-tweet.recommended-tweet'
    >
    locale: Attribute.String
  }
}

export interface ApiTagTag extends Schema.CollectionType {
  collectionName: 'tags'
  info: {
    singularName: 'tag'
    pluralName: 'tags'
    displayName: 'Tag'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    slug: Attribute.UID<'api::tag.tag', 'name_en'> & Attribute.Required
    name_en: Attribute.String & Attribute.Required
    name_nl: Attribute.String & Attribute.Required
    name_tr: Attribute.String & Attribute.Required
    blogs: Attribute.Relation<'api::tag.tag', 'manyToMany', 'api::blog.blog'>
    applications: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::application.application'
    >
    posts: Attribute.Relation<'api::tag.tag', 'manyToMany', 'api::post.post'>
    activities: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::activity.activity'
    >
    courses: Attribute.Relation<
      'api::tag.tag',
      'manyToMany',
      'api::course.course'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::tag.tag', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

export interface ApiTermTerm extends Schema.SingleType {
  collectionName: 'terms'
  info: {
    singularName: 'term'
    pluralName: 'terms'
    displayName: 'Term'
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    title: Attribute.String &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    slug: Attribute.UID<'api::term.term', 'title'> &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    image: Attribute.Media &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: false
        }
      }>
    content: Attribute.RichText &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::term.term', 'oneToOne', 'admin::user'> &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::term.term',
      'oneToMany',
      'api::term.term'
    >
    locale: Attribute.String
  }
}

export interface ApiTimelineTimeline extends Schema.CollectionType {
  collectionName: 'user_tweets'
  info: {
    singularName: 'timeline'
    pluralName: 'timelines'
    displayName: 'Timeline'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  pluginOptions: {
    i18n: {
      localized: true
    }
  }
  attributes: {
    username: Attribute.UID &
      Attribute.Required &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    userData: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    tweets: Attribute.JSON &
      Attribute.SetPluginOptions<{
        i18n: {
          localized: true
        }
      }>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::timeline.timeline',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    localizations: Attribute.Relation<
      'api::timeline.timeline',
      'oneToMany',
      'api::timeline.timeline'
    >
    locale: Attribute.String
  }
}

export interface ApiTopicTopic extends Schema.SingleType {
  collectionName: 'topics'
  info: {
    singularName: 'topic'
    pluralName: 'topics'
    displayName: 'Topic'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    data: Attribute.JSON
    isSyncing: Attribute.Boolean & Attribute.DefaultTo<false>
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::topic.topic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiTrendTrend extends Schema.SingleType {
  collectionName: 'trends'
  info: {
    singularName: 'trend'
    pluralName: 'trends'
    displayName: 'Trend'
  }
  options: {
    draftAndPublish: false
  }
  attributes: {
    en: Attribute.JSON
    nl: Attribute.JSON
    tr: Attribute.JSON
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::trend.trend',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::trend.trend',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiUserFeedbackUserFeedback extends Schema.CollectionType {
  collectionName: 'user_feedbacks'
  info: {
    singularName: 'user-feedback'
    pluralName: 'user-feedbacks'
    displayName: 'UserFeedback'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    comment: Attribute.Text
    point: Attribute.Integer
    image: Attribute.Media
    site: Attribute.String
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-feedback.user-feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::user-feedback.user-feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiUserStatisticUserStatistic extends Schema.CollectionType {
  collectionName: 'user_statistics'
  info: {
    singularName: 'user-statistic'
    pluralName: 'user-statistics'
    displayName: 'User Statistic'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    date: Attribute.Date
    stats: Attribute.JSON
    profile: Attribute.Relation<
      'api::user-statistic.user-statistic',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<
      'api::user-statistic.user-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
    updatedBy: Attribute.Relation<
      'api::user-statistic.user-statistic',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private
  }
}

export interface ApiVoteVote extends Schema.CollectionType {
  collectionName: 'votes'
  info: {
    singularName: 'vote'
    pluralName: 'votes'
    displayName: 'Vote'
    description: ''
  }
  options: {
    draftAndPublish: true
  }
  attributes: {
    value: Attribute.Integer &
      Attribute.Required &
      Attribute.SetMinMax<{
        min: 1
        max: 10
      }>
    voter: Attribute.Relation<
      'api::vote.vote',
      'manyToOne',
      'api::profile.profile'
    >
    application: Attribute.Relation<
      'api::vote.vote',
      'manyToOne',
      'api::application.application'
    >
    art: Attribute.Relation<'api::vote.vote', 'manyToOne', 'api::art.art'>
    jury: Attribute.Relation<
      'api::vote.vote',
      'manyToOne',
      'api::profile.profile'
    >
    createdAt: Attribute.DateTime
    updatedAt: Attribute.DateTime
    publishedAt: Attribute.DateTime
    createdBy: Attribute.Relation<'api::vote.vote', 'oneToOne', 'admin::user'> &
      Attribute.Private
    updatedBy: Attribute.Relation<'api::vote.vote', 'oneToOne', 'admin::user'> &
      Attribute.Private
  }
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission
      'admin::user': AdminUser
      'admin::role': AdminRole
      'admin::api-token': AdminApiToken
      'admin::api-token-permission': AdminApiTokenPermission
      'admin::transfer-token': AdminTransferToken
      'admin::transfer-token-permission': AdminTransferTokenPermission
      'plugin::upload.file': PluginUploadFile
      'plugin::upload.folder': PluginUploadFolder
      'plugin::i18n.locale': PluginI18NLocale
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission
      'plugin::users-permissions.role': PluginUsersPermissionsRole
      'plugin::users-permissions.user': PluginUsersPermissionsUser
      'api::account-statistic.account-statistic': ApiAccountStatisticAccountStatistic
      'api::activity.activity': ApiActivityActivity
      'api::applicant.applicant': ApiApplicantApplicant
      'api::application.application': ApiApplicationApplication
      'api::art.art': ApiArtArt
      'api::blog.blog': ApiBlogBlog
      'api::category.category': ApiCategoryCategory
      'api::collection.collection': ApiCollectionCollection
      'api::comment.comment': ApiCommentComment
      'api::competition.competition': ApiCompetitionCompetition
      'api::course.course': ApiCourseCourse
      'api::course-application.course-application': ApiCourseApplicationCourseApplication
      'api::donate.donate': ApiDonateDonate
      'api::feedback.feedback': ApiFeedbackFeedback
      'api::hashtag.hashtag': ApiHashtagHashtag
      'api::job.job': ApiJobJob
      'api::lang-role.lang-role': ApiLangRoleLangRole
      'api::mention.mention': ApiMentionMention
      'api::platform.platform': ApiPlatformPlatform
      'api::post.post': ApiPostPost
      'api::privacy.privacy': ApiPrivacyPrivacy
      'api::profile.profile': ApiProfileProfile
      'api::recommended-topic.recommended-topic': ApiRecommendedTopicRecommendedTopic
      'api::recommended-tweet.recommended-tweet': ApiRecommendedTweetRecommendedTweet
      'api::tag.tag': ApiTagTag
      'api::term.term': ApiTermTerm
      'api::timeline.timeline': ApiTimelineTimeline
      'api::topic.topic': ApiTopicTopic
      'api::trend.trend': ApiTrendTrend
      'api::user-feedback.user-feedback': ApiUserFeedbackUserFeedback
      'api::user-statistic.user-statistic': ApiUserStatisticUserStatistic
      'api::vote.vote': ApiVoteVote
    }
  }
}
