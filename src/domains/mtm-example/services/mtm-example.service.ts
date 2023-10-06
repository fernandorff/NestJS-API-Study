import { Injectable } from '@nestjs/common';
import { CreateMtmExampleDto } from '../dtos/create-mtm-example.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MtmExample } from '../entities/mtm-example';

@Injectable()
export class MtmExampleService {
  constructor(
    @InjectRepository(MtmExample)
    private repository: Repository<MtmExample>,
  ) {}

  findAll() {
    return this.repository.find({
      relations: ['users'],
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
      relations: ['users'],
    });
  }

  create(body: CreateMtmExampleDto) {
    const mtmExample = this.repository.create(body);
    return this.repository.save(mtmExample);
  }
}
