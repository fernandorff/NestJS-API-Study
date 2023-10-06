import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MtmExampleController } from './controllers/mtm-example.controller';
import { MtmExampleService } from './services/mtm-example.service';
import { MtmExample } from './entities/mtm-example';

@Module({
  imports: [TypeOrmModule.forFeature([MtmExample])],
  controllers: [MtmExampleController],
  providers: [MtmExampleService],
  exports: [MtmExampleService],
})
export class MtmExampleModule {}
