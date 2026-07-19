export const GALLERY_MESSAGES = {
  CREATED: 'Gallery image created successfully.',
  UPDATED: 'Gallery image updated successfully.',
  DELETED: 'Gallery image deleted successfully.',

  NOT_FOUND: 'Gallery image not found.',

  FORBIDDEN: 'You do not have permission to perform this action.',
} as const;

export const GALLERY_DEFAULT_PAGE = 1;
export const GALLERY_DEFAULT_LIMIT = 10;

export const GALLERY_SEARCH_FIELDS = ['title', 'description'] as const;

export const GALLERY_SUMMARY = {
  RECENT_LIMIT: 5,
} as const;
