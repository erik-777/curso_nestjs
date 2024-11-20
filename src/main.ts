import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function main() {
  const app = await NestFactory.create(AppModule);

  //api v2
  app.setGlobalPrefix('api/v2');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true, // para transformar los datos de los dtos
    transformOptions: {
      enableImplicitConversion: true
    }
  }))
  await app.listen(3001);
  console.log(`App running on port ${await app.getUrl()}`);
  //console.log(process.env)

}
main();
