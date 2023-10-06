import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtmExampleController } from './controllers/otm-example.controller';
import { OtmExampleService } from './services/otm-example.service';
import { OtmExampleEntity } from './entities/otm-example.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OtmExampleEntity])],
  controllers: [OtmExampleController],
  providers: [OtmExampleService],
})
export class OtmExampleModule {}
