export interface WelcomeContext extends Record<string, unknown> {
    appName: string;
    userName: string;
    loginUrl: string;
    year: number;
}