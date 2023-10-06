import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../../access-control/users/entities/user.entity';

@Entity()
export class OtmExampleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  string: string;

  @Column()
  number: number;

  @ManyToOne(() => User, (user) => user.otmExample)
  user: User;
}
