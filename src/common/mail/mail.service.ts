import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { MailOptions } from './interfaces/mail-options.interface';
import { ResetPasswordContext } from './interfaces/reset-password-context.interface';
import { WelcomeContext } from './interfaces/welcome-context.interface';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);

    constructor(
        private readonly mailerService: MailerService,
        private readonly configService: ConfigService,
    ) { }

    async sendMail<TContext extends Record<string, unknown>>(
        mailOptions: MailOptions<TContext>,
    ): Promise<void> {
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

    async sendWelcomeEmail(email: string, userName: string): Promise<void> {
        const appName = this.configService.getOrThrow<string>('app.name');

        const frontendUrl =
            this.configService.getOrThrow<string>('cors.origin');

        const context: WelcomeContext = {
            appName,
            logoUrl: this.configService.getOrThrow<string>('app.logoUrl'),
            userName,
            loginUrl: `${frontendUrl}/login`,
            year: new Date().getFullYear(),
        };

        await this.sendMail<WelcomeContext>({
            to: email,
            subject: `Welcome to ${appName}`,
            template: 'welcome',
            context,
        });
    }

    async sendResetPasswordEmail(
        email: string,
        userName: string,
        token: string,
    ): Promise<void> {
        const appName = this.configService.getOrThrow<string>('app.name');

        const frontendUrl =
            this.configService.getOrThrow<string>('cors.origin');

        const expireIn = this.configService.getOrThrow<string>(
            'auth.resetPasswordExpiresIn',
        );

        const context: ResetPasswordContext = {
            appName,
            logoUrl: this.configService.getOrThrow<string>('app.logoUrl'),
            userName,
            resetPasswordUrl: `${frontendUrl}/reset-password?token=${token}`,
            expireIn,
            year: new Date().getFullYear(),
        };

        await this.sendMail<ResetPasswordContext>({
            to: email,
            subject: `Reset your ${appName} password`,
            template: 'reset-password',
            context,
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
