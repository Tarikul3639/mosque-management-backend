export interface VerifyEmailContext {
  appName: string;
  customerName: string;
  verificationUrl: string;
  expireIn: string;
  year: number;
}