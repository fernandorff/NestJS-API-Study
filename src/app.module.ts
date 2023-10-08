import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as process from 'process';
import { APP_PIPE } from '@nestjs/core';
import { User } from './access-control/users/entities/user';
import { UsersModule } from './access-control/users/users.module';
import { MtmExample } from './domains/mtm-example/entities/mtm-example';
import { MtmExampleModule } from './domains/mtm-example/mtm-example.module';
import { OtmExampleModule } from './domains/otm-example/otm-example.module';
import { EmployeeModule } from './domains/employee/employee.module';

const cookieSession = require('cookie-session');

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'sqlite',
          database: config.get<string>('DB_NAME'),
          synchronize: true,
          entities: [User, MtmExample, MtmExample],
          autoLoadEntities: true,
        };
      },
    }),
    UsersModule,
    OtmExampleModule,
    MtmExampleModule,
    EmployeeModule,
    TypeOrmModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: ['keys'],
        }),
      )
      .forRoutes('*');
  }
}
