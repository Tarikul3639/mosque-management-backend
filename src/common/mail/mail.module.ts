import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from '@nestjs-modules/mailer/adapters/handlebars.adapter';
import { join } from "node:path";

import { MailService } from "./mail.service";

@Module({
    imports: [
        ConfigModule,

        MailerModule.forRootAsync({
            inject: [ConfigService],

            useFactory: (configService: ConfigService) => ({
                transport: {
                    host: configService.getOrThrow<string>("mail.host"),
                    port: configService.getOrThrow<number>("mail.port"),
                    secure: configService.getOrThrow<boolean>("mail.secure"),

                    auth: {
                        user: configService.getOrThrow<string>("mail.user"),
                        pass: configService.getOrThrow<string>("mail.pass"),
                    }
                },

                defaults: {
                    from: configService.getOrThrow<string>("mail.from"),
                },

                template: {
                    dir: join(__dirname, "templates"),
                    adapter: new HandlebarsAdapter(),
                    options: {
                        strict: true,
                    },
                },
            }),
        }),
    ],

    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }