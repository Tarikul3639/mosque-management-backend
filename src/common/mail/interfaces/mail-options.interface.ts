export interface MailOptions<
    TContext extends Record<string, unknown> = Record<string, unknown>,
> {
    to: string;
    subject: string;

    text?: string;
    html?: string;

    template?: string;
    context?: TContext;

    cc?: string | string[];
    bcc?: string | string[];

    attachments?: {
        filename: string;
        path: string;
        contentType?: string;
    }[];
}