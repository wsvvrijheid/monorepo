import { Activity, RawActivity } from './activity'
import { Announcement, RawAnnouncement } from './announcement'
import { Applicant, RawApplicant } from './applicant'
import { Application, RawApplication } from './application'
import { Art, RawArt } from './art'
import { ArtEditor, RawArtEditor } from './art-editor'
import { ArtFeedback, RawArtFeedback } from './art-feedback'
import { Artist, RawArtist } from './artist'
import { Author, RawAuthor } from './author'
import { Blog, RawBlog } from './blog'
import { Category, RawCategory } from './category'
import { Collection, RawCollection } from './collection'
import { Comment, RawComment } from './comment'
import { Competition, RawCompetition } from './competition'
import { Donate, RawDonate } from './donate'
import { RawUploadFile, UploadFile } from './file'
import { Hashtag, RawHashtag } from './hashtag'
import { Job, RawJob } from './job'
import { Juri, RawJuri } from './juri'
import { JuriVote, RawJuriVote } from './juri-vote'
import { LangRole, RawLangRole } from './lang-role'
import { Me } from './me'
import { Mention, RawMention } from './mention'
import { Post, RawPost } from './post'
import { Privacy, RawPrivacy } from './privacy'
import { Project, RawProject } from './project'
import { RawTag, Tag } from './tag'
import { RawTerm, Term } from './term'
import { RawTranslator, Translator } from './translator'
import { RawTrend, Trend } from './trend'
import { RawUser, User } from './user'
import { RawVolunteer, Volunteer } from './volunteer'
import { RawVote, Vote } from './vote'

export type PublicationState = 'LIVE' | 'PREVIEW'

export type StrapiModel =
  | Activity
  | Announcement
  | Applicant
  | Application
  | ArtEditor
  | ArtFeedback
  | Art
  | Artist
  | Author
  | Blog
  | Category
  | Collection
  | Comment
  | Competition
  | Donate
  | UploadFile
  | Hashtag
  | Job
  | JuriVote
  | Juri
  | LangRole
  | Me
  | Mention
  | Post
  | Privacy
  | Project
  | Tag
  | Term
  | Translator
  | Trend
  | User
  | Volunteer
  | Vote

export type StrapiRawModel =
  | RawActivity
  | RawAnnouncement
  | RawApplicant
  | RawApplication
  | RawArtEditor
  | RawArtFeedback
  | RawArt
  | RawArtist
  | RawAuthor
  | RawBlog
  | RawCategory
  | RawCollection
  | RawComment
  | RawCompetition
  | RawDonate
  | RawUploadFile
  | RawHashtag
  | RawJob
  | RawJuriVote
  | RawJuri
  | RawLangRole
  | RawMention
  | RawPost
  | RawPrivacy
  | RawProject
  | RawTag
  | RawTerm
  | RawTranslator
  | RawTrend
  | RawUser
  | RawVolunteer
  | RawVote

export type StrapiModelKeys = keyof (Activity &
  Announcement &
  Applicant &
  Application &
  ArtEditor &
  ArtFeedback &
  Art &
  Artist &
  Author &
  Blog &
  Category &
  Collection &
  Comment &
  Competition &
  Donate &
  UploadFile &
  Hashtag &
  Job &
  JuriVote &
  Juri &
  LangRole &
  Me &
  Mention &
  Post &
  Privacy &
  Project &
  Tag &
  Term &
  Translator &
  Trend &
  User &
  Volunteer &
  Vote)

export type Pagination = {
  page: number
  pageCount: number
  pageSize: number
  total: number
}

export type PaginationArg =
  | { limit: number; start: number }
  | { page: number; pageSize: number }

export type StrapiMeta = {
  pagination: Pagination
}

export type StrapiEntity<T extends StrapiModel> = T
export type StrapiCollection<T extends StrapiModel> = StrapiEntity<T>[]

export type StrapiRawEntity<T extends StrapiRawModel> = {
  id: number
  attributes: T
}

export type StrapiRawCollection<T extends StrapiRawModel> = Array<
  StrapiRawEntity<T>
>

export type StrapiRawData<T extends StrapiRawModel> =
  | StrapiRawEntity<T>
  | StrapiRawCollection<T>

export type StrapiData<T extends StrapiModel> = T | Array<T>

export type StrapiRawEntityResponse<T extends StrapiRawModel> = {
  data: StrapiRawEntity<T>
}

export type StrapiRawCollectionResponse<T extends StrapiRawModel> = {
  data: Array<StrapiRawEntity<T>>
  meta: StrapiMeta
}

export type StrapiRawResponse<T extends StrapiRawModel> =
  | StrapiRawEntityResponse<T>
  | StrapiRawCollectionResponse<T>
