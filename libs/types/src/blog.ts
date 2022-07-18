import { Author } from './author';
import { Category } from './category';
import { UploadFile } from './file';
import { Tag } from './tag';
import { User } from './user';
import { StrapiCollection, StrapiEntity } from './strapi';
import { Comment } from './comment';

export type Blog = {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: StrapiEntity<UploadFile>;
  likes: number;
  views: number;
  locale: string;
  author: StrapiEntity<Author>;
  categories: StrapiCollection<Category>;
  tags: StrapiCollection<Tag>;
  likers: StrapiCollection<User>;
  comments: StrapiCollection<Comment>;
  localizations: StrapiCollection<Blog>;
  createdAt: string;
  publishedAt: string;
  updatedAt: string;
};
