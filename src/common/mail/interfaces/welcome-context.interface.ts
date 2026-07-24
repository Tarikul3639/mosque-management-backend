export interface WelcomeContext extends Record<string, unknown> {
    appName: string;
    logoUrl: string;
    userName: string;
    loginUrl: string;
    year: number;
}