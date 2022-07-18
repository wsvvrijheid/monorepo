export type FileFormatsType = 'large' | 'small' | 'medium' | 'thumbnail';

export interface FileInfoInput {
  name: string;
  alternativeText: string;
  caption: string;
}

type FileFormat = {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
};

export type FileFormats = Record<FileFormatsType, FileFormat>;

export type UploadFile = {
  id: number;
  alternativeText: string;
  caption: string;
  createdAt: string;
  ext: string;
  formats: FileFormats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: string | null;
  provider: string;
  provider_metadata: any;
  size: number;
  updatedAt: string;
  url: string;
  width: number;
};
