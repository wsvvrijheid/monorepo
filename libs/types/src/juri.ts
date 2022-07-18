import { Volunteer } from './volunteer';
import { StrapiCollection, StrapiEntity } from './strapi';
import { Vote } from './vote';

export type Juri = {
  id: number;
  votes: StrapiCollection<Vote>;
  volunteer: StrapiEntity<Volunteer>;
};
