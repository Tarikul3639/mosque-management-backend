export const PAYMENT_MESSAGES = {
  CREATED: 'Payment created successfully.',
  UPDATED: 'Payment updated successfully.',
  DELETED: 'Payment deleted successfully.',

  NOT_FOUND: 'Payment not found.',

  FAMILY_NOT_FOUND: 'Family not found.',
  MONTHLY_CHARGE_NOT_FOUND: 'Monthly charge not found.',

  INVALID_AMOUNT: 'Invalid payment amount.',
  PAYMENT_EXCEEDS_DUE: 'Payment amount exceeds due amount.',
  ALREADY_PAID: 'Monthly charge has already been paid.',

  RECEIPT_GENERATED: 'Receipt generated successfully.',
  METHOD_NOT_SUPPORTED: 'Payment method not supported.',
  MONTHLY_CHARGE_DOES_NOT_BELONG_TO_FAMILY:
    'Monthly charge does not belong to this family.',
} as const;

export const PAYMENT_DEFAULT_PAGE = 1;
export const PAYMENT_DEFAULT_LIMIT = 10;

export const PAYMENT_SEARCH_FIELDS = [
  'receiptNo',
  'reference',
  'familyNo',
  'headName',
] as const;

export const PAYMENT_RECEIPT = {
  PREFIX: 'RCPT',
  PAD_LENGTH: 6,
} as const;

export const FAMILY_MESSAGES = {
  NOT_FOUND: 'Family not found.',
  LEDGER_NOT_FOUND: 'Family ledger not found.',
} as const;
