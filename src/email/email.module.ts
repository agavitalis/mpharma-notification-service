import { Module } from '@nestjs/common';
import { join } from 'path';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { config } from '../config/env';
import { EmailService } from './email.service';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: config.MAIL_SMTP_HOST,
        port: config.MAIL_SMTP_PORT,
        auth: {
          user: config.MAIL_USERNAME,
          pass: config.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      template: {
        dir: join(__dirname, 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  providers: [EmailService],
})
export class EmailModule {}
