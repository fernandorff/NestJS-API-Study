import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtmExampleController } from './controllers/otm-example.controller';
import { OtmExampleService } from './services/otm-example.service';
import { OtmExample } from './entities/otm-example';

@Module({
  imports: [TypeOrmModule.forFeature([OtmExample])],
  controllers: [OtmExampleController],
  providers: [OtmExampleService],
})
export class OtmExampleModule {}
