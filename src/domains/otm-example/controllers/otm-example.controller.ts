import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateOtmExampleDto } from '../dtos/create-otm-example.dto';
import { OtmExampleService } from '../services/otm-example.service';
import { AuthGuard } from '../../../access-control/guards/auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { OtmExampleDto } from '../dtos/otm-example.dto';
import { User } from '../../../access-control/users/entities/user.entity';
import { CurrentUser } from '../../../access-control/users/decorators/current-user.decorator';

@Controller('otm-example')
@ApiTags('One To Many - Example')
export class OtmExampleController {
  constructor(private reportsService: OtmExampleService) {}

  @Get()
  @Serialize(OtmExampleDto)
  findAll() {
    return this.reportsService.findAll();
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(OtmExampleDto)
  createReport(@Body() body: CreateOtmExampleDto, @CurrentUser() user: User) {
    return this.reportsService.create(body, user);
  }
}
