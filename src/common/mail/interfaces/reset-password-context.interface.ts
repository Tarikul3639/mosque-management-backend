export interface ResetPasswordContext extends Record<string, unknown> {
    appName: string;
    logoUrl: string;
    userName: string;
    resetPasswordUrl: string;
    expireIn: string;
    year: number;
}