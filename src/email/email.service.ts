import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '../config/env';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendWelcomeEmail(email: string, context: Record<string, unknown>) {
    await this.mailerService.sendMail({
      to: email,
      from: config.MAIL_FROM,
      subject: `Hi, You're Welcome to Ibx`,
      template: 'user/user-created',
      context,
    });
  }

  async sendEmail(
    email: string,
    subject: string,
    template: string,
    context: Record<string, unknown>,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: config.MAIL_FROM,
      subject,
      template,
      context,
    });
  }
}
