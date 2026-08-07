import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';

import { FieldError } from '../../common/interfaces/field-error.interface';

export const GlobalValidationPipe = new ValidationPipe({
  whitelist: true,
  transform: true,
  forbidNonWhitelisted: true,
  stopAtFirstError: true,

  exceptionFactory: (validationErrors: ValidationError[]) => {
    const errors: FieldError[] = [];

    const extractErrors = (
      validationErrors: ValidationError[],
      parent = '',
    ): void => {
      for (const error of validationErrors) {
        const field = parent ? `${parent}.${error.property}` : error.property;

        if (error.constraints) {
          errors.push({
            field,
            message: Object.values(error.constraints)[0],
          });
        }

        if (error.children?.length) {
          extractErrors(error.children, field);
        }
      }
    };

    extractErrors(validationErrors);

    return new BadRequestException({
      message: 'Validation failed.',
      errors,
    });
  },
});
