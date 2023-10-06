import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateOtmExampleDto } from '../dtos/create-otm-example.dto';
import { OtmExampleService } from '../services/otm-example.service';
import { AuthGuard } from '../../../access-control/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { OtmExampleDto } from '../dtos/otm-example.dto';
import { User } from '../../../access-control/users/entities/user.entity';
import { CurrentUser } from '../../../access-control/users/decorators/current-user.decorator';

@Controller('otm-example')
@ApiTags('One To Many - Example')
@Serialize(OtmExampleDto)
export class OtmExampleController {
  constructor(private otmExampleService: OtmExampleService) {}

  @Get()
  findAll() {
    return this.otmExampleService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Return otm example by id.' })
  async findById(@Param('id') id: string) {
    const user = await this.otmExampleService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('otm example not found');
    }
    return user;
  }

  @Post()
  @UseGuards(AuthGuard)
  createOtmExample(
    @Body() body: CreateOtmExampleDto,
    @CurrentUser() user: User,
  ) {
    return this.otmExampleService.create(body, user);
  }
}
