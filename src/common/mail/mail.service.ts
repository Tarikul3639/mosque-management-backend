import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { MailOptions } from './interfaces/mail-options.interface';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    async sendMail(mailOptions: MailOptions): Promise<void> {
        try {
            await this.mailerService.sendMail(mailOptions);

            this.logger.log(
                `Email "${mailOptions.subject}" sent successfully to ${mailOptions.to}`,
            );
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(
                    `Failed to send email "${mailOptions.subject}" to ${mailOptions.to}`,
                    error.stack,
                );
            } else {
                this.logger.error(
                    `Failed to send email "${mailOptions.subject}" to ${mailOptions.to}`,
                );
            }

            throw error;
        }
    }

    async sendWelcomeEmail(email: string, fullName: string): Promise<void> {
        await this.sendMail({
            to: email,
            subject: 'Welcome to Mosque Management System',
            template: 'welcome',
            context: {
                fullName,
            },
        });
    }

    async sendResetPasswordEmail(email: string, token: string): Promise<void> {
        const frontendUrl =
            this.configService.getOrThrow<string>('cors.origin');

        const resetUrl = `${frontendUrl}/reset-password?token=${token}`;

        await this.sendMail({
            to: email,
            subject: 'Reset Your Password',
            template: 'reset-password',
            context: {
                resetUrl,
            },
        });
    }

    async sendCustomEmail(
        email: string,
        subject: string,
        html: string,
    ): Promise<void> {
        await this.sendMail({
            to: email,
            subject,
            html,
        });
    }
}
