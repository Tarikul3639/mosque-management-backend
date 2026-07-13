export interface ResetPasswordContext extends Record<string, unknown> {
    appName: string;
    userName: string;
    resetPasswordUrl: string;
    expireIn: string;
    year: number;
}