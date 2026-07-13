import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { ApiErrorResponse } from '@/common/interfaces/api-error.interface';
import { FieldError } from '@/common/interfaces/field-error.interface';

interface ExceptionResponse {
    message?: string | string[];
    errors?: FieldError[];
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void {
        const context = host.switchToHttp();

        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        const statusCode = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        let message = 'Something went wrong.';
        let errors: FieldError[] | undefined;

        if (typeof exceptionResponse === 'string') {
            message = exceptionResponse;
        } else {
            const error = exceptionResponse as ExceptionResponse;

            if (Array.isArray(error.errors)) {
                errors = error.errors;
            }

            if (typeof error.message === 'string') {
                message = error.message;
            }

            if (Array.isArray(error.message)) {
                message = 'Validation failed.';

                errors = error.message.map((item) => ({
                    field: item.split(' ')[0],
                    message: item,
                }));
            }
        }

        const errorResponse: ApiErrorResponse = {
            success: false,
            statusCode,
            message,
            errors,
            timestamp: new Date().toISOString(),
            path: request.originalUrl,
        };

        response.status(statusCode).json(errorResponse);
    }
}