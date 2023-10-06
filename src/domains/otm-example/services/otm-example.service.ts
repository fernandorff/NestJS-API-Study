import { Injectable } from '@nestjs/common';
import { CreateOtmExampleDto } from '../dtos/create-otm-example.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OtmExample } from '../entities/otm-example';
import { User } from '../../../access-control/users/entities/user';

@Injectable()
export class OtmExampleService {
  constructor(
    @InjectRepository(OtmExample)
    private repository: Repository<OtmExample>,
  ) {}

  findAll() {
    return this.repository.find({
      relations: ['user'],
    });
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOne({
      where: {
        id: id,
      },
      relations: ['user'],
    });
  }

  create(body: CreateOtmExampleDto, user: User) {
    const otmExampleEntity = this.repository.create(body);
    otmExampleEntity.user = user;
    return this.repository.save(otmExampleEntity);
  }
}
