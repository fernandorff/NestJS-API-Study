import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../../access-control/users/entities/user';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  cpf: string;

  @Column()
  birth: Date;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;
}
