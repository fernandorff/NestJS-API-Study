import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../access-control/users/entities/user';

@Entity()
export class MtmExample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  string: string;

  @Column()
  number: number;

  @ManyToMany(() => User, (user) => user.mtmExamples)
  users: User[];
}
