// src/modules/families/constants/family.constants.ts

export const FAMILY_DEFAULT_PAGE = 1;
export const FAMILY_DEFAULT_LIMIT = 10;
export const FAMILY_MAX_LIMIT = 100;

export const FAMILY_DEFAULT_SORT_BY = 'createdAt';
export const FAMILY_DEFAULT_SORT_ORDER = 'desc';

export const FAMILY_SEARCHABLE_FIELDS = [
  'familyNo',
  'headName',
  'phone',
  'address',
] as const;

export const FAMILY_SORTABLE_FIELDS = [
  'familyNo',
  'headName',
  'createdAt',
  'updatedAt',
  'email',
] as const;

export const FAMILY_MESSAGES = {
  CREATED: 'Family created successfully.',
  UPDATED: 'Family updated successfully.',
  DELETED: 'Family deleted successfully.',
  EMAIL_EXISTS: 'Email address already exists.',

  NOT_FOUND: 'Family not found.',
  ALREADY_EXISTS: 'Family already exists.',
  PHONE_EXISTS: 'Phone number already exists.',
  INACTIVE: 'Family is inactive.',
  ACTIVE: 'Family is active.',
  ACTIVATED: 'Family activated successfully.',
  DEACTIVATED: 'Family deactivated successfully.',
  HARD_DELETED: 'Family permanently deleted successfully.',
} as const;

export const FAMILY_FEE_MESSAGES = {
  CREATED: 'Family fee created successfully.',
  UPDATED: 'Family fee updated successfully.',
  NOT_FOUND: 'Family fee not found.',
} as const;

export const MONTHLY_CHARGE_MESSAGES = {
  NOT_FOUND: 'Monthly charge not found.',
  UPDATED: 'Monthly charge updated successfully.',
  DELETED: 'Monthly charge deleted successfully.',
  ALREADY_EXISTS: 'Monthly charge already exists.',
  HAS_PAYMENTS:
    'This monthly charge already has payment records and cannot be deleted.',
} as const;
