import {
  Body,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BaseCrudService } from '../services/base-crud.service';

export abstract class BaseCrudController<T, CreateDto, UpdateDto> {
  constructor(private readonly service: BaseCrudService<T>) {}

  @Get()
  async findAll() {
    const entities = await this.service.findAll();
    return entities;
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    const entity = await this.service.findById(parseInt(id));
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  @Post()
  async create(@Body() createDto: CreateDto) {
    // @ts-ignore
    const entity = await this.service.create(createDto);
    return entity;
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    // @ts-ignore
    const entity = await this.service.update(parseInt(id), updateDto);
    if (!entity) {
      throw new NotFoundException('Entity not found');
    }
    return entity;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    const deleted = await this.service.delete(parseInt(id));
    if (!deleted) {
      throw new NotFoundException('Entity not found');
    }
    return { message: 'Entity deleted successfully' };
  }
}
