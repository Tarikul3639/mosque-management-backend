export interface MailOptions {
  to: string;
  subject: string;

  text?: string;
  html?: string;

  template?: string;
  context?: Record<string, unknown>;

  cc?: string | string[];
  bcc?: string | string[];

  attachments?: {
    filename: string;
    path: string;
    contentType?: string;
  }[];
}