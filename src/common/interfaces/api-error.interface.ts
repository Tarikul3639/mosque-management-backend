import { FieldError } from './field-error.interface';

export interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string;
  errors?: FieldError[];
  timestamp: string;
  path: string;
}
