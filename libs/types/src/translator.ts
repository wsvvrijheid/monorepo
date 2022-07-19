import { LangRole } from './lang-role';
import { Post } from './post';
import { Volunteer } from './volunteer';
import { StrapiCollection, StrapiEntity } from './strapi';

export type Translator = {
  id: number;
  posts: StrapiCollection<Post>;
  roles: StrapiCollection<LangRole>;
  volunteer: StrapiEntity<Volunteer>;
};
