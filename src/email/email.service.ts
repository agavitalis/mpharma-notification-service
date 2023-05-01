import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { config } from '../config/env';

@Injectable()
export class EmailService {
  constructor(private mailerService: MailerService) {}

  async sendDiagnosisUploadStatusEmail(
    email: string,
    context: Record<string, unknown>,
  ) {
    await this.mailerService.sendMail({
      to: email,
      from: config.MAIL_FROM,
      subject: `Hi, mPharam Log Upload Status`,
      template: 'diagnosis/diagnosis-upload-status',
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
