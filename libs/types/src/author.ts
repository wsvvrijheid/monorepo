import { Blog } from './blog';
import { Volunteer } from './volunteer';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Author = {
  id: number;
  blogs: StrapiCollection<Blog>;
  volunteer: StrapiEntity<Volunteer>;
};
