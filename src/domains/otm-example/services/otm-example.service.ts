import { Injectable } from '@nestjs/common';
import { CreateOtmExampleDto } from '../dtos/create-otm-example.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtmExampleEntity } from '../entities/otm-example.entity';
import { User } from '../../../access-control/users/entities/user.entity';

@Injectable()
export class OtmExampleService {
  constructor(
    @InjectRepository(OtmExampleEntity)
    private repository: Repository<OtmExampleEntity>,
  ) {}

  findAll() {
    return this.repository.find();
  }

  create(body: CreateOtmExampleDto, user: User) {
    // @ts-ignore
    const otmExampleEntity = this.repository.create(body);
    otmExampleEntity.user = user;
    return this.repository.save(otmExampleEntity);
  }
}
