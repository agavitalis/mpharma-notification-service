import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { ApiTags } from '@nestjs/swagger';
import { DiagnosisService } from './diagnosis.service';

@ApiTags('Diagnosis')
@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  /* ----------------------------
  Diagnosis Events
  --------------------------------
  0. diagnosis-uploaded *
  */

  @EventPattern('diagnosis-uploaded')
  async handleDiagnosisUploadedEvent(
    @Payload() data: any,
    @Ctx() context: RmqContext,
  ) {
    const payloadData = data._doc ? data._doc : data;
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    await this.diagnosisService.handleDiagnosisUploadedEvent(payloadData);
    console.log(
      `[DIAGNOSIS UPLOADED]: just registered 🎉 with status: ${payloadData}`,
    );
    channel.ack(originalMsg);
  }
}
