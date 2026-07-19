export const EXPENSE_MESSAGES = {
    CREATED: 'Expense created successfully.',
    UPDATED: 'Expense updated successfully.',
    DELETED: 'Expense deleted successfully.',

    NOT_FOUND: 'Expense not found.',

    FORBIDDEN: 'You do not have permission to perform this action.',
} as const;

export const EXPENSE_DEFAULT_PAGE = 1;
export const EXPENSE_DEFAULT_LIMIT = 10;

export const EXPENSE_SEARCH_FIELDS = ['title', 'note'] as const;

export const EXPENSE_SUMMARY = {
    RECENT_LIMIT: 5,
} as const;
