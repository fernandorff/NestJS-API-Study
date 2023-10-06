import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../access-control/users/entities/user';

@Entity()
export class OtmExample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  string: string;

  @Column()
  number: number;

  @ManyToOne(() => User, (user) => user.otmExamples)
  user: User;
}
