import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return '<h1 style="text-align:center"> Hello, from mPharma Notification-Service! </h1>';
  }
}
