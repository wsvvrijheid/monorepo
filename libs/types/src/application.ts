import { Applicant } from './applicant';
import { Competition } from './competition';
import { UploadFile } from './file';
import { Tag } from './tag';
import { StrapiCollection, StrapiEntity } from './strapi';
import { Vote } from './vote';
import { JuriVote } from './juri-vote';

export type Application = {
  id: number;
  title: string;
  slug: string;
  content: string;
  image: StrapiEntity<UploadFile>;
  competition: StrapiEntity<Competition>;
  applicant: StrapiEntity<Applicant>;
  votes: StrapiCollection<Vote>;
  juriVotes: StrapiCollection<JuriVote>;
  tags: StrapiCollection<Tag>;
};
