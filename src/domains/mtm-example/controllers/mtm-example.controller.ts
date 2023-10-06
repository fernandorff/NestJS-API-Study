import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateMtmExampleDto } from '../dtos/create-mtm-example.dto';
import { MtmExampleService } from '../services/mtm-example.service';
import { AuthGuard } from '../../../access-control/guards/auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Serialize } from '../../../interceptors/serialize.interceptor';
import { MtmExampleDto } from '../dtos/mtm-example.dto';

@Controller('mtm-example')
@ApiTags('Many To Many - Example')
@Serialize(MtmExampleDto)
export class MtmExampleController {
  constructor(private otmExampleService: MtmExampleService) {}

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
  createOtmExample(@Body() body: CreateMtmExampleDto) {
    return this.otmExampleService.create(body);
  }
}
