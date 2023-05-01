import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';
const ADMIN_EMAIL = 'agavitalisogbonna@gmail.com';

@Injectable()
export class DiagnosisService {
  constructor(private readonly mailService: EmailService) {}

  async handleDiagnosisUploadedEvent(payloadData: Record<string, unknown>) {
    try {
      // Send Email to the admin
      await this.mailService.sendDiagnosisUploadStatusEmail(`${ADMIN_EMAIL}`, {
        status: payloadData,
      });
      console.log(`Mail sent to: ${ADMIN_EMAIL})}`);
    } catch (error) {
      console.log(`Error occurred while sending email: \n${error}`);
    }

    return;
  }
}
