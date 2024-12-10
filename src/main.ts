import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function main() {

  const logger = new Logger('main')

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    // transform: true,
    // transformOptions: {
    //   enableImplicitConversion: true
    // }
  }))

  app.setGlobalPrefix('api/v1');

  await app.listen(envs.server_port);

  logger.log(`Application is running on: ${await app.getUrl()}`);

}

main();
