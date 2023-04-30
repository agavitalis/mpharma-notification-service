import { Injectable } from '@nestjs/common';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class DiagnosisService {
  constructor(private readonly mailService: EmailService) {}

  async handleDiagnosisUploadedEvent(payloadData: Record<string, unknown>) {
    try {
      // Send Email to the user
      await this.mailService.sendWelcomeEmail(`${payloadData.email}`, {
        firstName: payloadData.firstName,
        lastName: payloadData.lastName,
      });
      console.log(`Mail sent to: ${JSON.stringify(payloadData.email)}`);
    } catch (error) {
      console.log(`Error occurred while sending email: \n${error}`);
    }

    return;
  }
}
