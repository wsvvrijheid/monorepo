import { Volunteer } from './volunteer';
import { StrapiCollection, StrapiEntity } from './strapi';
import { ArtFeedback } from './art-feedback';

export type ArtEditor = {
  id: number;
  feedbacks: StrapiCollection<ArtFeedback>;
  volunteer: StrapiEntity<Volunteer>;
};
