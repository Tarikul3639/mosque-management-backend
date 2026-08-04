export const DEVELOPMENT_PROJECT_MESSAGES = {
  CREATED: 'Development project created successfully.',
  UPDATED: 'Development project updated successfully.',
  DELETED: 'Development project deleted successfully.',

  NOT_FOUND: 'Development project not found.',

  FORBIDDEN: 'You do not have permission to perform this action.',
} as const;

export const DEVELOPMENT_PROJECT_DEFAULT_PAGE = 1;
export const DEVELOPMENT_PROJECT_DEFAULT_LIMIT = 10;

export const DEVELOPMENT_PROJECT_SEARCH_FIELDS = [
  'title',
  'description',
] as const;

export const DEVELOPMENT_PROJECT_SUMMARY = {
  RECENT_LIMIT: 5,
} as const;
