import { Art, RawArt } from './art';
import { Blog, RawBlog } from './blog';
import { RawUser, User } from './user';
import { StrapiEntity, StrapiRawEntity } from './strapi';

export type RawComment = {
  id: number;
  content: string;
  name: string;
  email: string;
  user: StrapiRawEntity<RawUser>;
  blog: StrapiRawEntity<RawBlog>;
  art: StrapiRawEntity<RawArt>;
};

export type Comment = {
  id: number;
  content: string;
  name: string;
  email: string;
  user: StrapiEntity<User>;
  blog: StrapiEntity<Blog>;
  art: StrapiEntity<Art>;
  createdAt: string;
};
