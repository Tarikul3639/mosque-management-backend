import { Injectable, Logger } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { MailOptions } from './interfaces/mail-options.interface';

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    constructor(private readonly mailerService: MailerService) { }

    async sendMail(mailOptions: MailOptions): Promise<void> {
        try {
            await this.mailerService.sendMail(mailOptions);

            this.logger.log(`Email sent successfully to ${mailOptions.to}`);
        } catch (error: unknown) {
            if (error instanceof Error) {
                this.logger.error(
                    `Failed to send email to ${mailOptions.to}`,
                    error.stack,
                );
            } else {
                this.logger.error(`Failed to send email to ${mailOptions.to}`);
            }

            throw error;
        }
    }
}
