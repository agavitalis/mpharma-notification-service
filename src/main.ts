import { RequestMethod, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { config } from './config/env';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = config.PORT || 5002;

  const NOTIFICATION_SERVICE_EVENT =
    await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.RMQ,
      options: {
        urls: [config.RABBITMQ_URL],
        queue: config.RABBITMQ_NOTIFICATION_QUEUE,
        queueOptions: {
          durable: false,
        },
        noAck: false,
      },
    });

  app.enableCors({
    credentials: true,
  });
  app.setGlobalPrefix('api/v1', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('mPharma Notification Microservice')
    .setDescription('mPharma Notification Microservice API Endpoint')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'access-token',
    )
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/docs', app, document);

  //apply validation pipe
  app.useGlobalPipes(new ValidationPipe());

  // Server Listening on port
  await app.listen(PORT);
  await NOTIFICATION_SERVICE_EVENT.listen();
  console.log(
    'mPharma Notification Service on PORT:' +
      PORT +
      ' accessible on: http://localhost:' +
      PORT,
  );
}
bootstrap();
