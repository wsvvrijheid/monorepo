import { Applicant, RawApplicant } from './applicant';
import { Artist, RawArtist } from './artist';
import { Post, RawPost } from './post';
import { RawRole, Role } from './role';
import { RawVolunteer, Volunteer } from './volunteer';
import { RawVote, Vote } from './vote';
import {
  StrapiCollection,
  StrapiEntity,
  StrapiRawCollection,
  StrapiRawEntity,
} from './strapi';

export type RawUser = {
  id: number;
  email: string;
  username: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: RawRole;
  createdPosts?: StrapiRawCollection<RawPost>;
  applicant?: StrapiRawEntity<RawApplicant>;
  volunteer?: StrapiRawEntity<RawVolunteer>;
  votes?: StrapiRawCollection<RawVote>;
  artist: StrapiRawEntity<RawArtist>;
};

export type User = {
  id: number;
  email: string;
  username: string;
  blocked: boolean;
  confirmed: boolean;
  provider: string;
  createdAt: string;
  updatedAt: string;
  role: Role;
  createdPosts?: StrapiCollection<Post>;
  applicant?: StrapiEntity<Applicant>;
  volunteer?: StrapiEntity<Volunteer>;
  votes?: StrapiCollection<Vote>;
  artist: StrapiEntity<Artist>;
  avatar: { url: string };
};
