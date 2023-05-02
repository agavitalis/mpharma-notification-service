import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello from mPharma!"', () => {
      expect(appController.getHello()).toBe(
        '<h1 style="text-align:center"> Hello, from mPharma Notification-Service! </h1>',
      );
    });
  });
});
