import { Inject, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //Inject
    ConfigModule.forRoot({

      isGlobal: true,

    }),
    TypeOrmModule.forRoot({

      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      port: +process.env.POSTGRES_PORT,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule { }
