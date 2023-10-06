import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  create(email: string, password: string) {
    const user = this.repository.create({ email, password });

    return this.repository.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repository.findOneBy({ id });
  }

  findAllByEmail(email: string) {
    return this.repository.find({
      where: { email },
    });
  }

  findAll() {
    return this.repository.find();
  }

  async update(id: number, attrs: Partial<User>) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('users not found');
    }
    Object.assign(user, attrs);
    return this.repository.save(user);
  }

  async remove(id: number, session: any) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('users not found');
    }
    if (id === session.userId) {
      session.userId = null;
    }
    return this.repository.remove(user);
  }
}
