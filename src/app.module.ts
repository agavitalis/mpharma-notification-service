import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [EmailModule, DiagnosisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
