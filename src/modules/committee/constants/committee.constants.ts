export const COMMITTEE_MESSAGES = {
    CREATED: 'Committee member created successfully.',
    UPDATED: 'Committee member updated successfully.',
    DELETED: 'Committee member deleted successfully.',

    NOT_FOUND: 'Committee member not found.',

    PHONE_ALREADY_EXISTS:
        'A committee member with this phone number already exists.',

    EMAIL_ALREADY_EXISTS:
        'A committee member with this email address already exists.',
} as const;

export const COMMITTEE_DEFAULT_PAGE = 1;
export const COMMITTEE_DEFAULT_LIMIT = 10;

export const COMMITTEE_SEARCH_FIELDS = ['name', 'phone', 'email'] as const;
