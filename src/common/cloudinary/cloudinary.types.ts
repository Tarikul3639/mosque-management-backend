import { UploadApiOptions } from 'cloudinary';

export type ResourceType = 'image' | 'raw' | 'video';

export const CloudinaryFolder = Object.freeze({
  USERS: 'users',
  FAMILIES: 'families',
  DONORS: 'donors',
  GALLERY: 'gallery',
  COMMITTEE: 'committee',
  PROJECTS: 'projects',
  DOCUMENTS: 'documents',
});

export type CloudinaryFolderType =
  (typeof CloudinaryFolder)[keyof typeof CloudinaryFolder];

export interface UploadOptions extends Omit<
  UploadApiOptions,
  'folder' | 'resource_type'
> {
  resourceType?: ResourceType;
}
