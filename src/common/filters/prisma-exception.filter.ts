import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { Prisma } from '@/lib/prisma/client';

import { ApiErrorResponse } from '@/common/interfaces/api-error.interface';
import { FieldError } from '@/common/interfaces/field-error.interface';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost,
    ): void {
        const context = host.switchToHttp();

        const request = context.getRequest<Request>();
        const response = context.getResponse<Response>();

        let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Database error.';
        let errors: FieldError[] | undefined;

        switch (exception.code) {
            case 'P2002': {
                statusCode = HttpStatus.CONFLICT;
                message = 'Validation failed.';

                const target = exception.meta?.target;

                const field =
                    Array.isArray(target) && typeof target[0] === 'string'
                        ? target[0]
                        : 'field';

                errors = [
                    {
                        field,
                        message: `${field} already exists.`,
                    },
                ];

                break;
            }

            case 'P2025': {
                statusCode = HttpStatus.NOT_FOUND;
                message = 'Resource not found.';
                break;
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