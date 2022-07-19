import { Art } from './art';
import { Blog } from './blog';
import { User } from './user';
import { StrapiEntity } from './strapi';

export type Comment = {
  id: number;
  content: string;
  name: string;
  email: string;
  user: StrapiEntity<User>;
  blog: StrapiEntity<Blog>;
  art: StrapiEntity<Art>;
};
